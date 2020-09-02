import { Component, OnInit} from '@angular/core';
import { MenuController, ToastController, ModalController } from '@ionic/angular';
import { CategoriaService } from '../Servicios/categoria.service';
import { ProductoService } from '../Servicios/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnoService } from '../Servicios/turno.service';
import { NosotrosPage } from '../Paginas/nosotros/nosotros.page';
import { TerminosCondicionesPage } from '../Paginas/terminos-condiciones/terminos-condiciones.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  buscar:boolean=false;
  cate:any=[];
  turn:any=[];
  productos:any=[];
  productosCate:any=[];
  IdRestaurante:string="1";
  TodosProductos:boolean=true;
  filtur:boolean=true;
  //FiltroProductos:boolean=false;
  SelectValue:string;
  texto:string; 
  index:number;
  mostrarc:boolean=false;
  Valorcategoria:string;
  idCategoria:string;
  NombreRestaurante:string;
  constructor(
    private menu: MenuController,
    private Categoria:CategoriaService, 
    private Producto:ProductoService,
    public activity:ActivatedRoute,
    private toast:ToastController,
    private turno:TurnoService,
    private ruta:Router,
    private modalCTRL:ModalController,
    ) {}
  
  
    mostrar(){
    this.buscar=!this.buscar;
  }
  /*
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  */

  openFirst() {
    this.buscar=false;
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  mostrarCate(){
    this.mostrarc=!this.mostrarc;
  }
  
  ngOnInit(){
    this.IdRestaurante=this.activity.snapshot.paramMap.get('id');
    this.NombreRestaurante=this.activity.snapshot.paramMap.get('nombre');
    this.CargarTurno();
    this.CargarCategoria();
    this.MostrarProductos();
  }

  Ir(){
    this.filtur=true;
    this.buscar=false;
     this.menu.close();
   // this.menu.open('end');
    this.TodosProductos=true;
  }



  CargarTurno() {
    
      this.turno.TurnoObte()
        .then((data) => {
          this.turn = data["result"];
                
        })
        .catch((error) => {
          debugger
          console.log(error);
        });
      
  }
  CargarCategoria() {
    
    this.Categoria.CategoriaObtener()
      .then((data) => {
        this.cate = data["result"];
              
      })
      .catch((error) => {
        debugger
        console.log(error);
      });
    
}
  async Vacio(mensaje : string) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: 3000,
      color: "warning",
    });
    toast.present();
   
  }


  Cambiocat(){
    this.TodosProductos=false;
    //this.FiltroProductos=true;
    this.productosCate=[];
    if (this.productos.length > 0) {
      let i=0;
      for (let data of this.productos) {
        if(data['idturno']==this.SelectValue){
          this.productosCate[i]=data;
          i++;
        }
      }
        if(this.productosCate.length==0){
          this.Vacio("No hay productos en esta categoria. ");
        }
      
    } else {
      this.Vacio("No hay productos en esta categoria. ");
    }
  }



  catefiltro(id :string){
    this.menu.close();
    this.TodosProductos=false;
    this.buscar=false;
    this.filtur=false;
    this.buscar=true;
    this.mostrarc=false;
    this.productosCate=[];
    if (this.productos.length > 0) {
      let i=0;
      for (let data of this.productos) {
        if(data['idcategoria']==id){
          this.productosCate[i]=data;
          i++;
        }
      }
        if(this.productosCate.length==0){
          this.Vacio("No hay productos en esta categoria. ");
        }
      
    } else {
      this.Vacio("No hay productos en esta categoria. ");
    }
  }


  MostrarProductos() {
    
    this.Producto.ProductosObtener(this.IdRestaurante)
      .then((data) => {
        this.productos = data['result'];
        
          if(this.productos==null || this.productos==""){
            this.Vacio("El restaurante no contiene productos.");

          } 
      })
      .catch((error) => {
        console.log(error);
      });
    
  }


  async nosotros(){
    const modal= await this.modalCTRL.create({
      component: NosotrosPage,
      componentProps: {
        id:  this.IdRestaurante,
        nombre: this.NombreRestaurante
      }
      
    });
    return modal.present();
  }

  async terminosCondiciones(){
    const modal= await this.modalCTRL.create({
      component: TerminosCondicionesPage,
      
      
    });
    return modal.present();
  }

 
  
}
