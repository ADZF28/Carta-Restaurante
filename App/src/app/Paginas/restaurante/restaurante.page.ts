import { Component, OnInit } from "@angular/core";
import { MenuController, NavController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { RestauranteService } from "../../Servicios/restaurante.service";
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
import { ImagenService } from '../../Servicios/imagen.service';

@Component({
  selector: "app-restaurante",
  templateUrl: "./restaurante.page.html",
  styleUrls: ["./restaurante.page.scss"],
})
export class RestaurantePage {
  nombre: string;
  
  resanterior:string;
  resnuevo:string;

  texto:string;
  texto2:string;
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
  addsucu: boolean = false;
  mosinfo:  boolean = false;
  resmodi: boolean= false;
  aprobado: boolean = false;
  

  SelectRes: string;
  SelectValue: string;
  Selectsucu: string;
  SelectorSucursal:string;
  selectmodires:string;

  Arestau: any = [];
  Sucu: any = [];
  MosSucu: any = [];

  base64Image:string;
  imageURI: any;
  imageFileName: any;
  UrlImagen: any;
  imagenBD: any ;
  msgdata: any;
  myphoto: any;
  

  constructor(
    private ruta: Router,
    public navCtrl: NavController,
    private menu: MenuController,
    private restaura: RestauranteService,
    private toast: ToastController,
    private action: ActionSheetController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private img:ImagenService
  ) { }

  ngOnInit(): void {
    this.traerRestau();
  }

  traerInfo() {
    
    this.restaura
      .TraerInfoRestaurante(this.SelectRes)
      .then((data) => {

        this.Sucu = data["result"];
        if (this.Sucu.length < 1) {
          this.mensa("Este restaurnate no cuenta con sucursales.", "warning");
        }
      })
      .catch((error) => {
        //  debugger;
        console.log(error);
      });
  }

  MostrarInfo() {
    
    this.restaura
      .TraerInfoRestaurante(this.SelectorSucursal)
      .then((data) => {

        this.MosSucu = data["result"];
        if (this.MosSucu.length < 1) {
          this.mensa("Este restaurnate no cuenta con sucursales.", "warning");
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
  compri4() {
    this.addsucu = !this.addsucu;
  }
  compri5() {
    this.mosinfo = !this.mosinfo;
  }
  compri6() {
    this.resmodi = !this.resmodi;
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
  recu() {

    for (let item of this.Sucu) {
      if (this.Selectsucu == item['id']) {
        this.direccionm = item['direccion'];
        this.descripcionm = item['descripcion'];
        this.horariom = item['horario'];
        this.contactom = item['contacto'];
        this.esloganm = item['eslogan'];
        this.sucursalm = item['sucursal'];
      }
    }
  }
  agregarsucur() {

    if (
      this.imagenBD==""||
      this.imagenBD==null||
      this.SelectValue == "" ||
      this.SelectValue == null ||
      this.horarios == "" ||
      this.horarios == null ||
      this.contactos == "" ||
      this.contactos == null ||
      this.direccions == "" ||
      this.direccions == null ||
      this.eslogans == "" ||
      this.eslogans == null ||
      this.descripcions == "" ||
      this.descripcions == null ||
      this.sucursals == "" ||
      this.sucursals == null
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
        sucursal: this.sucursals,
      };
      
      this.restaura
        .AgregarInfoRestaurante(datosIR)
        .then((data) => {
          this.SelectValue = "";
          this.contactos = "";
          this.direccions = "";
          this.eslogans = "";
          this.horarios = "";
          this.descripcions = "";
          this.sucursals = "";
          this.imagenBD="";

          this.uploadFile();

          this.mensa("La sucursal se ha guardado.", "secondary");
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
  eliminar2(id: string) {

    this.restaura
      .EliminarInfoRestaurante(id)
      .then((data) => {
        this.traerRestau();
        this.mensa("La sucursal se ha eliminado.", "secondary");
      })
      .catch((error) => {
        // debugger
        console.log(error);
      });

  }
  modificarrestau(){
    if(this.resnuevo==""||
    this.resnuevo==null||
    this.resanterior==""||
    this.resanterior==null||
    this.selectmodires==""||
    this.selectmodires==null
    ){
      this.mensa("Se deben llenar todos los campos.", "warning");
    } else {
      
      let datosIR = {
        nombre: this.resnuevo,
        
      };
      this.restaura
        .ModificarRestaurante(datosIR, this.selectmodires)
        .then((data) => {
          
          this.Arestau= [];
          this.Sucu = [];
          this.MosSucu = [];
          this.selectmodires="";
          this.SelectRes="";
          this.SelectValue="";
          this.Selectsucu="";
          this.SelectorSucursal="";
          this.resanterior="";
          this.resnuevo="";

          this.traerRestau();


          this.mensa("El restaurante se Actualizado.", "secondary");
        })
        .catch((error) => {
          //  debugger;
        });


    }
  }
  retroali(){
    for(let item of this.Arestau){
      if(item['id']== this.selectmodires){
        this.resanterior=item['nombre'];
      }
    }
  }

 modificar() {

    if (

      this.SelectRes == "" ||
      this.SelectRes == null ||
      this.Selectsucu == "" ||
      this.Selectsucu == null ||
      this.horariom == "" ||
      this.horariom == null ||
      this.contactom == "" ||
      this.contactom == null ||
      this.direccionm == "" ||
      this.direccionm == null ||
      this.esloganm == "" ||
      this.esloganm == null ||
      this.descripcionm == "" ||
      this.descripcionm == null ||
      this.sucursalm == "" ||
      this.sucursalm == null
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
        sucursal: this.sucursalm,
      };
      this.restaura
        .ModificarInfoRestaurante(datosIR, this.Selectsucu)
        .then((data) => {

          
          this.SelectRes = "";
          this.Selectsucu = "";
          this.contactom = "";
          this.direccionm = "";
          this.esloganm = "";
          this.horariom = "";
          this.descripcionm = "";
          this.sucursalm="";
          this.Arestau=[];
          this.SelectorSucursal="";
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
  async prueba(mensaje: string, colo: string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 9000,
      color: colo,
    });
    toast.present();
  }

  async ActionsPhoto() {
    const actionSheet = await this.action.create({
      header: 'Opciones',
      buttons: [{
        text: 'Tomar foto',
        icon: 'camera',
        handler: () => {
          this.takephoto();
        }
      }, 
      {
        text: 'Elegir de galería',
        icon: 'images',
        handler: () => {
          this.getimage();
        }
      },
      {
        text: 'Eliminar foto actual',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.imagenBD="";
        }
      }, {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  takephoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 500,
      targetHeight: 500,
    };
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = imageData;
      this.prueba(imageData,"warning")
      this.imagenBD="ok";
    }, (err) => {
      // Handle error
    });
  }

  getimage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: true,
      targetWidth: 500,
      targetHeight: 500,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = imageData;
      this.imagenBD="ok";      
      this.prueba(imageData,"warning")

      }, (err) => {
      // Handle error
    });
  }
  cancelar() {
    this.navCtrl.navigateForward(`search-wifi`);
  }

  async uploadFile() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
    });
    await loading.present();
    this.imagenBD = new Date().getTime() + ".jpg";
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imagenBD,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpeg',
      headers: {}
    }
    let modelo="InfoRestaurante";
    let id="1";
    fileTransfer.upload(this.myphoto, encodeURI('https://pacific-brook-35350.herokuapp.com/api/imagenes/'+id+"/"+modelo ), options)
      .then((data) => {
        this.UrlImagen = "https://pacific-brook-35350.herokuapp.com/Imagenes/" + this.imagenBD;
        this.mensa("Imagen actualizada", "secondary");
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
        this.mensa("Error al cargar la imagen", "warning");
      });
  }





}
