import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


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
  openFirst2() {
 
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  salir2(){
    this.ruta.navigate(["/"]);
  }
}
