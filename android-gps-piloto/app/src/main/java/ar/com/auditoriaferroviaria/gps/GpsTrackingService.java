package ar.com.auditoriaferroviaria.gps;

import android.Manifest;
import android.app.Service;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ServiceInfo;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

public final class GpsTrackingService extends Service implements LocationListener {
    public static final String START="ar.com.auditoriaferroviaria.GPS_START";
    public static final String STOP="ar.com.auditoriaferroviaria.GPS_STOP";
    public static final String EXTRA_TRAIN="train";
    public static final String PREFS="gps_native_pilot";
    private static final String CHANNEL="gps_native_pilot_status";private static final int NOTIFY=1420;
    private LocationManager gps;private File file;private boolean recording=false,gap=false;
    private long lastReceived=0,startTime=0,count=0;
    private final Handler handler=new Handler(Looper.getMainLooper());
    private final Runnable watchdog=new Runnable(){
        @Override public void run(){
            if(!recording)return;
            long elapsed=System.currentTimeMillis()-(lastReceived>0?lastReceived:startTime);
            if(elapsed>20000&&!gap){
                gap=true;event("GPS_LOST","Sin muestras durante más de 20 segundos; ubicación desconocida");
                state(true,"⚠ Sin GPS desde hace "+(elapsed/1000)+" s");
                notifyText("⚠ SIN GPS · sin nuevas posiciones");
            }
            handler.postDelayed(this,5000);
        }
    };
    @Override public IBinder onBind(Intent i){return null;}
    @Override public int onStartCommand(Intent intent,int flags,int id){
        if(intent!=null&&STOP.equals(intent.getAction())){stopRecording("Detenido desde notificación");return START_NOT_STICKY;}
        if(recording)return START_NOT_STICKY;
        if(intent==null||!START.equals(intent.getAction())){stopSelf();return START_NOT_STICKY;}
        if(checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)!=PackageManager.PERMISSION_GRANTED){
            state(false,"Permiso GPS preciso no concedido");stopSelf();return START_NOT_STICKY;
        }
        gps=(LocationManager)getSystemService(LOCATION_SERVICE);
        if(gps==null||!gps.isProviderEnabled(LocationManager.GPS_PROVIDER)){
            state(false,"Encendé Ubicación/GPS del teléfono");stopSelf();return START_NOT_STICKY;
        }
        try{
            NotificationManager nm=(NotificationManager)getSystemService(NOTIFICATION_SERVICE);
            if(nm!=null)nm.createNotificationChannel(new NotificationChannel(CHANNEL,"Auditoría · GPS activo",NotificationManager.IMPORTANCE_LOW));
            Notification first=notification("Registrando recorrido GPS");
            if(Build.VERSION.SDK_INT>=29)startForeground(NOTIFY,first,ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION);
            else startForeground(NOTIFY,first);
            String t=intent.getStringExtra(EXTRA_TRAIN);t=t==null?"sin_servicio":t.replaceAll("[^0-9A-Za-z_-]","");
            if(t.isEmpty())t="sin_servicio";
            String name="gps_"+t+"_"+new SimpleDateFormat("yyyyMMdd_HHmmss",Locale.US).format(new Date())+".csv";
            file=new File(getFilesDir(),name);
            if(file.exists())file=new File(getFilesDir(),"gps_"+t+"_"+new SimpleDateFormat("yyyyMMdd_HHmmss_SSS",Locale.US).format(new Date())+".csv");
            append("event,received_iso_utc,received_unix_ms,fix_unix_ms,latitude,longitude,gps_accuracy_m,speed_kmh,seconds_since_previous_fix,detail\n");
            recording=true;gap=false;count=0;lastReceived=0;startTime=System.currentTimeMillis();
            event("START","Servicio "+t);state(true,"GPS iniciado · esperando primera ubicación");
            gps.requestLocationUpdates(LocationManager.GPS_PROVIDER,2000L,0.0f,this,Looper.getMainLooper());
            handler.postDelayed(watchdog,5000);
        }catch(Exception ex){
            state(false,"No se pudo iniciar: "+ex.getClass().getSimpleName());cleanup();stopSelf();
        }
        return START_NOT_STICKY;
    }
    private Notification notification(String text){
        PendingIntent open=PendingIntent.getActivity(this,0,new Intent(this,MainActivity.class),
            PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
        PendingIntent stop=PendingIntent.getService(this,1,new Intent(this,GpsTrackingService.class).setAction(STOP),
            PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
        return new Notification.Builder(this,CHANNEL).setSmallIcon(android.R.drawable.ic_menu_mylocation)
            .setContentTitle("Auditoría Ferroviaria · GPS").setContentText(text)
            .setContentIntent(open).setOngoing(true).addAction(new Notification.Action.Builder(null,"Detener GPS",stop).build()).build();
    }
    private void notifyText(String s){NotificationManager m=(NotificationManager)getSystemService(NOTIFICATION_SERVICE);if(m!=null)m.notify(NOTIFY,notification(s));}
    @Override public void onLocationChanged(Location loc){
        if(!recording||file==null||loc==null)return;
        long now=System.currentTimeMillis(),elapsed=lastReceived==0?-1:now-lastReceived;
        try{
            if(elapsed>20000)append(csv("GAP",now,0,"","","","",val(elapsed/1000.0),"Intervalo sin muestras; trayectoria desconocida"));
            append(csv("FIX",now,loc.getTime(),val(loc.getLatitude()),val(loc.getLongitude()),
                loc.hasAccuracy()?val(loc.getAccuracy()):"",loc.hasSpeed()?val(loc.getSpeed()*3.6):"",
                elapsed<0?"":val(elapsed/1000.0),"GPS"));
            if(gap){event("GPS_RESTORED","Primera ubicación tras interrupción");gap=false;notifyText("Registrando recorrido GPS");}
            lastReceived=now;count++;
            getSharedPreferences(PREFS,MODE_PRIVATE).edit().putLong("count",count).apply();
            state(true,"Registro activo · "+count+" puntos · precisión "+(loc.hasAccuracy()?Math.round(loc.getAccuracy())+" m":"sin informar"));
        }catch(IOException ex){stopRecording("Error guardando CSV: "+ex.getClass().getSimpleName());}
    }
    @Override public void onProviderDisabled(String p){
        if(recording&&LocationManager.GPS_PROVIDER.equals(p)){event("GPS_DISABLED","Se desactivó GPS");state(true,"GPS desactivado; sin posición actual");}
    }
    private static String val(double v){return String.format(Locale.US,"%.6f",v);}
    private static String iso(long ms){
        SimpleDateFormat s=new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",Locale.US);
        s.setTimeZone(TimeZone.getTimeZone("UTC"));return s.format(new Date(ms));
    }
    private static String quote(String x){return "\""+x.replace("\"","\"\"")+"\"";}
    private static String csv(String e,long now,long fix,String lat,String lon,String acc,String speed,String elapsed,String text){
        return e+","+iso(now)+","+now+","+(fix==0?"":fix)+","+lat+","+lon+","+acc+","+speed+","+elapsed+","+quote(text)+"\n";
    }
    private void append(String line)throws IOException{
        if(file==null)throw new IOException("Archivo ausente");
        try(FileOutputStream out=new FileOutputStream(file,true)){
            out.write(line.getBytes(StandardCharsets.UTF_8));out.getFD().sync();
        }
    }
    private void event(String e,String note){try{append(csv(e,System.currentTimeMillis(),0,"","","","","",note));}catch(IOException ignored){}}
    private void state(boolean active,String text){
        SharedPreferences.Editor e=getSharedPreferences(PREFS,MODE_PRIVATE).edit()
            .putBoolean("active",active).putString("status",text);
        if(file!=null)e.putString("file",file.getName());
        e.apply();
    }
    private void cleanup(){
        if(gps!=null)try{gps.removeUpdates(this);}catch(SecurityException ignored){}
        handler.removeCallbacks(watchdog);recording=false;
        if(Build.VERSION.SDK_INT>=24)stopForeground(STOP_FOREGROUND_REMOVE);else stopForeground(true);
    }
    private void stopRecording(String text){
        if(recording)event("STOP",text);
        cleanup();state(false,text+" · archivo conservado");stopSelf();
    }
    @Override public void onDestroy(){
        if(recording){event("STOP_SERVICE","Servicio terminado; revisar continuidad GPS");cleanup();state(false,"Servicio finalizado");}
        super.onDestroy();
    }
}
