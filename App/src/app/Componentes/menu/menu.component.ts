import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Routes, Router } from "@angular/router";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor( 
    private ruta: Router,
     private menu:MenuController
     ) { }

  ngOnInit() {}
  retau:boolean=true;
  produc:boolean=false; 
  qr:boolean=false;

 uno(){
   this.retau=true;
   this.produc=false;
   this.qr=false;
   this.ruta.navigate(['/restaurante']);
 }

 dos(){
  this.retau=false;
  this.produc=true;
  this.qr=false;
  this.ruta.navigate(['/producto']);
}

tres(){
  this.retau=false;
  this.produc=false;
  this.qr=true;
  this.ruta.navigate(['/administrador']);
}

}
