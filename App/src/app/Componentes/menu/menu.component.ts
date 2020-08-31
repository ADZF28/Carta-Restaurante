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

 

}
