import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Routes, Router } from "@angular/router";
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  constructor(    
    private ruta: Router,
    private menu:MenuController
    ) {}

  ngOnInit() {
  }
  openFirst() {
 
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  salir(){
    this.ruta.navigate(["/"]);
  }
}
