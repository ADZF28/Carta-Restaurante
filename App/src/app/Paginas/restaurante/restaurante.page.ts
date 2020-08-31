import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage {


  nombre:string;
  imagen:string;
  direccion:string;
  descripcion:string;
  idr:string;
  horario:string;
  contacto:string;
  eslogan:string;

  agrega:boolean=false;
  mostra:boolean=false;
  actu:boolean=false;
  aprobado:boolean=false;

  constructor(
    private ruta: Router,
    private menu:MenuController
  ) { }
 

  openFirst2() {
 
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  salir2(){
    this.ruta.navigate(["/"]);
  }

  compri(){
    this.agrega=!this.agrega;
  }
  compri2(){
    this.mostra=!this.mostra;
  }
  compri3(){
    this.actu=!this.actu;
  }
  agregar(){}
}
