import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from "@ionic/angular";
import { Routes, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  pas: string;
  
  constructor(
    private toastP: ToastController,
    private ruta: Router,
    private loadingController:LoadingController
  ) {}

  ngOnInit() {}


  async incorrecto() {
    const toast = await this.toastP.create({
      message: "Datos Invalidos ",
      duration: 3000,
      color: "danger",
    });
    toast.present();
    this.user = "";
    this.pas = "";
   
  }
  

  dire(){
    this.user = "";
    this.pas = "";
    this.ruta.navigate(["/"]);
  }

  async vacios(mensaje:string) {
    const toast = await this.toastP.create({
      message: mensaje,
      duration: 3000,
      color: "warning",
    });
    toast.present();
  }

  vali() {
    if (
      this.pas == null ||
      this.pas == "" ||
      this.user == null ||
      this.user == ""
    ) {
      this.vacios("Todos los campos deben de completarse.");
    } else {
        if(this.pas =="admin"&&  this.user=="admin"){
          this.ruta.navigate(["/administrador"]);

        }else
        this.vacios("Datos incorrectos.");
      
       }
  }

}
