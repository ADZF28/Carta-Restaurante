import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Routes, Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { RestauranteService } from '../../Servicios/restaurante.service';


@Component({
  selector: 'app-escaneo',
  templateUrl: './escaneo.page.html',
  styleUrls: ['./escaneo.page.scss'],
})
export class EscaneoPage implements OnInit {

  datocodificado: any;
  datoscaneado:string;


  constructor(
    private barcodeScanner: BarcodeScanner,
    private ruta: Router,
    private toast:ToastController,
    private resta:RestauranteService
    ) {

  }

  ngOnInit() {
  }

  async ingreso(mensaje: string) {
    const toast = await this.toast.create({
      message: "Bienvenido al restaurante"+mensaje+".",
      duration: 3000,
      color: "success",
    });
    toast.present();
   
  }

  async error(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 3000,
      color: "danger",
    });
    toast.present();
   
  }

  async mensaje(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 5000,
      color: "success",
    });
    toast.present();
   
  }

  LeerCode() {
    
    this.barcodeScanner.scan().then(barcodeData => {
        this.datoscaneado = barcodeData['text'];
        this.ReconocerRestaurante(this.datoscaneado);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
 
  CodificarTexto() {
    
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.datocodificado).then(
        encodedData => {
          this.datocodificado = encodedData;
        },
        err => {
          console.log("Un error ha ocurrido: " + err);
        }
      );
  }

  ReconocerRestaurante(nombreresta: string) {
    
    if(nombreresta=="Administradores"){
      this.mensaje("Administradorr comprobado");
      this.ruta.navigate(["/login"]);
    }else{

      this.resta.ObtenerIDRestaurante(nombreresta)
  .then((data) => {
  
    if (data['code'] == "200" ) {
      this.error("Codigo QR incorrecto.");
    } else {
     
      let nombre,id;
     
          id=data['result'].id;
          nombre=data['result'].nombre;
        
        this.mensaje( ""+nombre);
      if(id==""||id==null||nombre==""||nombre==null){
        this.mensaje("vacios");

      }else{
      this.ruta.navigate(["/home/"+id+"/"+nombre]);
      this.mensaje("/home/"+id+"/"+nombre);
      }
      
    }
  })
  .catch((error) => {
    debugger
    this.mensaje("error");

    console.log(error);
  });

    }
    
    
  }
    

}