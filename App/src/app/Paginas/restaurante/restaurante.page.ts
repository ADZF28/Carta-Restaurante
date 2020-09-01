import { Component, OnInit } from "@angular/core";
import { MenuController, NavController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { RestauranteService } from "../../Servicios/restaurante.service";

@Component({
  selector: "app-restaurante",
  templateUrl: "./restaurante.page.html",
  styleUrls: ["./restaurante.page.scss"],
})
export class RestaurantePage {
  nombre: string;

  imagenm: string;
  direccionm: string;
  descripcionm: string;
  horariom: string;
  contactom: string;
  esloganm: string;
  sucursalm: string;

  imagens: string;
  direccions: string;
  descripcions: string;
  horarios: string;
  contactos: string;
  eslogans: string;
  sucursals: string;

  agrega: boolean = false;
  mostra: boolean = false;
  actu: boolean = false;
  addsucu: boolean =false;
  aprobado: boolean = false;
  SelectRes:string;
  SelectValue:string;
  Selectsucu:string;
  
  
  Arestau: any = [];
  Sucu:any=[];
  constructor(
    private ruta: Router,
    private menu: MenuController,
    private restaura: RestauranteService,
    private toast: ToastController
  ) {}

  ngOnInit(): void {
    this.traerRestau();
  }

  traerInfo() {
    
    this.restaura
      .TraerInfoRestaurante(this.SelectRes)
      .then((data) => {
        
        this.Sucu = data["result"];
       if(this.Sucu.length<1){
        this.mensa("Este restaurnate no cuenta con sucursales.","warning");
       }
      })
      .catch((error) => {
      //  debugger;
        console.log(error);
      });
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

  openFirst2() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }
  salir2() {
    this.ruta.navigate(["/"]);
  }

  compri() {
    this.agrega = !this.agrega;
  }
  compri2() {
    this.mostra = !this.mostra;
  }
  compri3() {
    this.actu = !this.actu;
  }
  compri4(){
    this.addsucu=!this.addsucu;
  }
  agregar() {
    if (
      this.nombre == "" ||
      this.nombre == null 
    ) {
      this.mensa("Se deben llenar todos los campos.", "warning");
    } else {
      let datosR = {
        nombre: this.nombre,
      };

      this.restaura
        .AgregarRestaurante(datosR)
        .then((data) => {
          if (data["code"] == "201") {
            this.nombre = "";
            this.mensa(
              "Este restaurante ya se encuentra registrado.",
              "warning"
            );
          } else {
            this.nombre = "";
            this.traerRestau();
            this.mensa("El restaurante se ha guardado.", "secondary");
          }
        })
        .catch((error) => {
       //   debugger
        });
      
    }
  }
  recu(){
   
    for(let item of this.Sucu){
      if(this.Selectsucu==item['id']){
        this.direccionm=item['direccion'];
        this.descripcionm=item['descripcion'];
        this.horariom=item['horario'];
        this.contactom=item['contacto'];
        this.esloganm=item['eslogan'];
        this.sucursalm=item['sucursal'];
      }
    }
  }
  agregarsucur() {

    if (
      
      this.SelectValue==""||
      this.SelectValue==null||
      this.horarios == "" ||
      this.horarios == null ||
      this.contactos == "" ||
      this.contactos == null ||
      this.direccions == "" ||
      this.direccions == null ||
      this.eslogans == "" ||
      this.eslogans == null ||
      this.descripcions == "" ||
      this.descripcions == null||
      this.sucursals==""||
      this.sucursals==null
    ) {
      this.mensa("Se deben llenar todos los campos.", "warning");
    } else {
      let datosIR = {
        idrestaurante: this.SelectValue,
        contacto: this.contactos,
        direccion: this.direccions,
        eslogan: this.eslogans,
        descripcion: this.descripcions,
        horario: this.horarios,
        sucursal:this.sucursals,
      };
      this.restaura
        .AgregarInfoRestaurante(datosIR)
        .then((data) => {
          this.SelectValue="";
          this.contactos = "";
          this.direccions = "";
          this.eslogans = "";
          this.horarios = "";
          this.descripcions = "";
          this.sucursals="";
          this.mensa("El restaurante se ha guardado.", "secondary");
        })
        .catch((error) => {
        //  debugger;
        });
      
      
    }
  }

  eliminar(id: string) {
  
    this.restaura
      .EliminarRestaurante(id)
      .then((data) => {
        this.traerRestau();
        this.mensa("El restaurante se ha eliminado.", "secondary");
      })
      .catch((error) => {
       // debugger
        console.log(error);
      });
    
  }

  modificar(){
  
    if (
      
      this.SelectRes==""||
      this.SelectRes==null||
      this.Selectsucu==""||
      this.Selectsucu==null||
      this.horariom == "" ||
      this.horariom == null ||
      this.contactom == "" ||
      this.contactom == null ||
      this.direccionm == "" ||
      this.direccionm == null ||
      this.esloganm == "" ||
      this.esloganm == null ||
      this.descripcionm == "" ||
      this.descripcionm == null||
      this.sucursalm==""||
      this.sucursalm==null
    ) {
      this.mensa("Se deben llenar todos los campos.", "warning");
    } else {
     
      let datosIR = {
        idrestaurante: this.SelectRes,
        contacto: this.contactom,
        direccion: this.direccionm,
        eslogan: this.esloganm,
        descripcion: this.descripcionm,
        horario: this.horariom,
        sucursal:this.sucursalm,
      };
      this.restaura
        .ModificarInfoRestaurante(datosIR,this.SelectRes)
        .then((data) => {
          this.SelectRes="";
          this.Selectsucu="";
          this.contactom = "";
          this.direccionm = "";
          this.esloganm = "";
          this.horariom = "";
          this.descripcionm = "";
          this.mensa("El restaurante se Actualizado.", "secondary");
        })
        .catch((error) => {
        //  debugger;
        });
      
      
    }
  }
  async mensa(mensaje: string, colo: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 4000,
      color: colo,
    });
    toast.present();
  }
}
