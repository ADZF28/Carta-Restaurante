import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Routes, Router } from "@angular/router";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  retau:boolean=false;
  produc:boolean=false; 
  qr:boolean=false;
  @Input('entrada') page;
  constructor( 
    private ruta: Router,
     private menu:MenuController
     ) { }

  ngOnInit() {
    if(this.page=="1"){
      this.retau=true;
      this.produc=false;
      this.qr=false;
    }else if(this.page=="2"){
      this.retau=false;
      this.produc=true;
      this.qr=false;
    } else{
      this.retau=false;
      this.produc=false;
      this.qr=true;
    }
  }
 

 uno(){
   
   this.ruta.navigate(['/restaurante']);
 }

 dos(){
  this.ruta.navigate(['/producto']);
}

tres(){
  this.ruta.navigate(['/administrador']);
}

}
