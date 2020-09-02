import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { RestauranteService } from '../../Servicios/restaurante.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  qrData = '';
	scannedCode = null;
  elementType:  'canvas' = 'canvas';
  hasWriteAccess: boolean = false;
  Arestau:any=[];
  combo:boolean=true;
  input:boolean=false;

  constructor(    
    private ruta: Router,
    private menu:MenuController,
    private barcodeScanner: BarcodeScanner,
		private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController,
    private androidPermissions:AndroidPermissions,
    private restaura:RestauranteService
    ) {}

  ngOnInit() {
    this.traerRestau();
  }
  escri(){
    this.combo=false;
    this.input=true;
  }
  resta(){
    this.combo=true;
    this.input=false;
  }
  scanCode() {
		this.barcodeScanner.scan().then((barcodeData) => {
			this.scannedCode = barcodeData.text;
		});
  }

  ionViewWillEnter() {
    this.checkPermissions();
 }
 traerRestau() {
  this.restaura
    .TodosRestaurante()
    .then((data) => {
      this.Arestau = data["result"];

      if (this.Arestau.length > 0) {
        //this.idr = this.Arestau[this.Arestau.length - 1].id + 1;

      } else {

      }

    })
    .catch((error) => {
      debugger;
      console.log(error);
    });
}

 checkPermissions() {
  this.androidPermissions
  .checkPermission(this.androidPermissions
  .PERMISSION.WRITE_EXTERNAL_STORAGE)
  .then((result) => {
   console.log('Has permission?',result.hasPermission);
   this.hasWriteAccess = result.hasPermission;
 },(err) => {
     this.androidPermissions
       .requestPermission(this.androidPermissions
       .PERMISSION.WRITE_EXTERNAL_STORAGE);
  });
  if (!this.hasWriteAccess) {
    this.androidPermissions
      .requestPermissions([this.androidPermissions
      .PERMISSION.WRITE_EXTERNAL_STORAGE]);
  }
}
 downloadR() {
  if (!this.hasWriteAccess) {
    this.checkPermissions();
  }
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  const imageData = canvas.toDataURL('image/jpeg').toString();
  console.log('data: ', imageData);

  let data = imageData.split(',')[1];

  this.base64ToGallery.base64ToGallery(data, { prefix: '_img', mediaScanner:true }).then(
      async (res) => {
        let toast = await this.toastCtrl.create({
          header: 'QR code saved to Photolibrary',
        });
        toast.present();
      },
      err => console.log('err: ', err)
    );
}
  openFirst2() {
 
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  salir2(){
    this.ruta.navigate(["/"]);
  }
}
