import { Component, OnInit} from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { CategoriaService } from '../Servicios/categoria.service';
import { ProductoService } from '../Servicios/producto.service';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from '../Servicios/turno.service';

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
  FiltroProductos:boolean=false;
  SelectValue:string;
  texto:string; 
  index:number;
  mostrarc:boolean=false;
  constructor(
    private menu: MenuController,
    private Categoria:CategoriaService, 
    private Producto:ProductoService,
    public activity:ActivatedRoute,
    private toast:ToastController,
    private turno:TurnoService
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
    this.CargarTurno();
    this.CargarCategoria();
    this.MostrarProductos();
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
    this.FiltroProductos=true;
    this.productosCate=[];
    if (this.productos.length > 0) {
      let i=0;
      for (let data of this.productos) {
        if(data['idcategoria']==this.SelectValue){
        
          this.productosCate[i]=data;
          i++;

        }
      }

      
    } else {

      this.Vacio("No hay productos en esta categoria. ");
    }
  }

  MostrarProductos() {
    
    this.Producto.ProductosObtener(this.IdRestaurante)
      .then((data) => {
        this.productos = data["result"];
        
          if(this.productos.length<0){
            this.Vacio("El restaurante no contiene productos.");

          } 
      })
      .catch((error) => {
        debugger
        console.log(error);
      });
    
  }
 
  
}
