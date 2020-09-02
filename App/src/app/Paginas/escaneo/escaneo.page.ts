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
  datoscaneado: {};
  id:string;
  nombre:string;


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
      message: "Bienvenido al restaurante "+mensaje+".",
      duration: 3000,
      color: "success",
    });
    toast.present();
   
  }
  async error(mensaje: string) {
    const toast = await this.toast.create({
      message: "Bienvenido al restaurante "+mensaje+".",
      duration: 3000,
      color: "danger",
    });
    toast.present();
   
  }

  LeerCode() {
    
    this.barcodeScanner.scan().then(barcodeData => {
        this.datoscaneado = barcodeData;
        this.ReconocerRestaurante(String(this.datoscaneado));
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
      this.ruta.navigate(["/login"]);
    }else{

      this.resta.ObtenerIDRestaurante(nombreresta)
      .then((data) => {
        let Restau = data["result"];
        
        if (Restau.length > 0) {
          for (let data of Restau) {
           if(data['nombre'== nombreresta]){
            this.id=data['id'];
            this.nombre=data['nombre'];
            break;
           }
            
          }
          this.ruta.navigate(["/home/"+this.id+"/"+this.nombre]);
          this.ingreso( String(this.datoscaneado));
        } else {
        
          this.error("Codigo QR incorrecto.");
          
        }
      })
      .catch((error) => {
        debugger
        console.log(error);
      });

    }
    
    
  }
 

}
