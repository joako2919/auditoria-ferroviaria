package ar.com.auditoriaferroviaria.gps;

import android.Manifest;
import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.view.View;
import android.view.ViewGroup;
import android.widget.*;
import android.text.InputType;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;

public final class MainActivity extends Activity {
    private static final int LOC=101, NOTIFY=102, EXPORT=103;
    private EditText train; private TextView status; private Spinner files; private String chosen;
    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        ScrollView scroll=new ScrollView(this); LinearLayout layout=new LinearLayout(this);
        layout.setOrientation(1); int p=(int)(16*getResources().getDisplayMetrics().density);
        layout.setPadding(p,p,p,p); scroll.addView(layout); setContentView(scroll);
        TextView title=new TextView(this);title.setTextSize(22);title.setText("Auditoría Ferroviaria — GPS nativo · prueba");layout.addView(title);
        TextView info=new TextView(this);
        info.setText("Piloto independiente. El GPS continúa cuando cambiás de aplicación mientras Android mantenga activo el servicio. Guarda posiciones reales, sin calcular estaciones, H21 ni infracciones; no modifica la app web.");
        info.setPadding(0,p,0,p);layout.addView(info);
        train=new EditText(this); train.setHint("Servicio ferroviario, por ejemplo 3107");
        train.setInputType(InputType.TYPE_CLASS_NUMBER);layout.addView(train);
        addButton(layout,"Iniciar GPS persistente",v->startFromScreen());
        addButton(layout,"Detener GPS",v->{stopService(new Intent(this,GpsTrackingService.class)); refresh();});
        status=new TextView(this);status.setPadding(0,p,0,p);layout.addView(status);
        addButton(layout,"Actualizar estado",v->refresh());
        TextView label=new TextView(this);label.setText("Registros guardados por servicio:");layout.addView(label);
        files=new Spinner(this);layout.addView(files);
        addButton(layout,"Exportar recorrido CSV",v->exportCsv());
        TextView note=new TextView(this);
        note.setText("Iniciá el seguimiento con la pantalla abierta. Al terminar, detenelo y exportá el CSV. Si apagás el GPS o Android termina el servicio pueden existir tramos sin datos. No se inventan posiciones.");
        note.setPadding(0,p,0,0);layout.addView(note);
        refresh();
    }
    private void addButton(LinearLayout parent,String text,View.OnClickListener listener) {
        Button b=new Button(this);b.setText(text);b.setOnClickListener(listener);parent.addView(b);
    }
    private void startFromScreen() {
        if (train.getText().toString().trim().isEmpty()) {status.setText("Ingresá el número de servicio.");return;}
        if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)!=PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION,Manifest.permission.ACCESS_COARSE_LOCATION},LOC);return;
        }
        if (Build.VERSION.SDK_INT>=33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)!=PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS},NOTIFY);return;
        }
        Intent i=new Intent(this,GpsTrackingService.class).setAction(GpsTrackingService.START);
        i.putExtra(GpsTrackingService.EXTRA_TRAIN,train.getText().toString().trim());
        try {startForegroundService(i);status.setText("Solicitando ubicación: actualizá el estado para comprobar muestras.");}
        catch (RuntimeException e) {status.setText("No se pudo iniciar el GPS: "+e.getClass().getSimpleName());}
    }
    @Override public void onRequestPermissionsResult(int code,String[] perm,int[] results) {
        super.onRequestPermissionsResult(code,perm,results);
        if(code==LOC){if(checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION)==PackageManager.PERMISSION_GRANTED)startFromScreen();else status.setText("Se requiere ubicación precisa para el seguimiento.");}
        else if(code==NOTIFY)startFromScreenAfterNotify();
    }
    private void startFromScreenAfterNotify() {
        Intent i=new Intent(this,GpsTrackingService.class).setAction(GpsTrackingService.START);
        i.putExtra(GpsTrackingService.EXTRA_TRAIN,train.getText().toString().trim());
        try{startForegroundService(i);status.setText("Solicitando ubicación GPS.");}
        catch(RuntimeException e){status.setText("No se pudo iniciar: "+e.getClass().getSimpleName());}
    }
    @Override protected void onResume(){super.onResume();if(status!=null)refresh();}
    private void refresh() {
        if(status==null||files==null)return;
        SharedPreferences s=getSharedPreferences(GpsTrackingService.PREFS,MODE_PRIVATE);
        status.setText((s.getBoolean("active",false)?"Activo · ":"Inactivo · ")+s.getString("status","Sin iniciar")
            +"\nArchivo: "+s.getString("file","ninguno")+"\nPosiciones registradas: "+s.getLong("count",0));
        String selected=files.getSelectedItem()==null?"":files.getSelectedItem().toString();
        File[] existing=getFilesDir().listFiles((dir,name)->name.matches("gps_[0-9A-Za-z_-]+_[0-9]{8}_[0-9]{6}(_[0-9]{3})?\\.csv"));
        ArrayList<String> list=new ArrayList<>();
        if(existing!=null)for(File f:existing)list.add(f.getName());
        Collections.sort(list,Collections.reverseOrder());
        ArrayAdapter<String> a=new ArrayAdapter<>(this,android.R.layout.simple_spinner_item,list);
        a.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);files.setAdapter(a);
        if(list.contains(selected))files.setSelection(list.indexOf(selected));
    }
    private void exportCsv() {
        if(files.getSelectedItem()==null){status.setText("No hay recorridos todavía.");return;}
        chosen=files.getSelectedItem().toString();
        Intent i=new Intent(Intent.ACTION_CREATE_DOCUMENT);
        i.addCategory(Intent.CATEGORY_OPENABLE);i.setType("text/csv");i.putExtra(Intent.EXTRA_TITLE,chosen);
        startActivityForResult(i,EXPORT);
    }
    @Override protected void onActivityResult(int request,int result,Intent data) {
        super.onActivityResult(request,result,data);
        if(request!=EXPORT||result!=RESULT_OK||data==null||chosen==null)return;
        Uri destination=data.getData();if(destination==null)return;
        File original=new File(getFilesDir(),chosen);
        try(FileInputStream in=new FileInputStream(original);OutputStream out=getContentResolver().openOutputStream(destination)){
            if(out==null)throw new java.io.IOException("Destino inaccesible");
            byte[] bytes=new byte[8192];int n;while((n=in.read(bytes))!=-1)out.write(bytes,0,n);
            status.setText("CSV exportado: "+chosen);
        }catch(Exception e){status.setText("No se pudo exportar: "+e.getClass().getSimpleName());}
    }
}
