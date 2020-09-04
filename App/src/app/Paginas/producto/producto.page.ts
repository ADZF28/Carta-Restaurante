import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategoriaService } from '../../Servicios/categoria.service';
import { TurnoService } from '../../Servicios/turno.service';
import { RestauranteService } from '../../Servicios/restaurante.service';
import { ProductoService } from 'src/app/Servicios/producto.service';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  agrega:boolean=false;
  cate:any=[];
  turn:any=[];
  productos:any=[];
  productosCate:any=[];
  Restaurantes:any=[];
  idres:any=[];
  texto:string;
  mostra:boolean=false;
  actu:boolean=false;
  // Variables de Ingreso
  nombre:string;
  precio:string;
  descripcion:string;
  ValorTurno:string;
  ValorCate:string;
  ValorRestaurante:string;

  // Variables de Actualización
  Unombre:string;
  Uprecio:string;
  Udescripcion:string;
  UValorTurno:string;
  UValorCate:string;
  UValorRestaurante:string;
  id:string;
  rest:string;

  constructor(private ruta: Router,
    private menu:MenuController,
    private Categoria:CategoriaService,
    private turno:TurnoService,
    private restaurante:RestauranteService,
    private PostAddProducto:ProductoService,
    private toast:ToastController,) { }

  ngOnInit() {
    this.CargarTurno();
    this.CargarCategoria();
    this.CargarRestaurante();
    this.ObtenerProductos();
  }

  ObtenerProductos(){
    this.PostAddProducto.AllProductosObtener()
      .then((data) => {
        this.productos = data['result'];
       // this.consultarRestaurante(this.productos);
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  consultarRestaurante(id:string){
    this.restaurante.IdProductoResta(id)
    .then((data) => {
      this.idres = data["result"];
  
    })
    .catch((error) => {
      debugger
      console.log(error);
    });
  }
  
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

  CargarRestaurante() {
  
  this.restaurante.TodosRestaurante()
    .then((data) => {
      this.Restaurantes = data["result"];
  
    })
    .catch((error) => {
      debugger
      console.log(error);
    });
  
  }

Cambiocat(){
  for(let item of this.Restaurantes){
    if(this.UValorRestaurante==item['id']){
      this.rest=item['nombre'];
    }
  }
}

compri2(){
  this.mostra=!this.mostra;
}
compri3(){
  this.actu=!this.actu;
}
async Alerta(mensaje:string, colo:string, tiempo:any) {
  const toast = await this.toast.create({
    message: mensaje,
    duration: tiempo,
    color: colo,
  });
  toast.present();
}

agregar(){

  let data2 = {
    'nombre':this.nombre,
    'precio':this.precio,
    'descripcion': this.descripcion,
    'idrestaurante':this.ValorRestaurante,
    'idcategoria':this.ValorCate,
    'idturno': this.ValorTurno
  }

  if(this.nombre==""||this.nombre==null||this.precio==""||this.precio==null||this.descripcion==""||this.descripcion==null||this.ValorRestaurante==""||this.ValorRestaurante==null||this.ValorCate==""||this.ValorCate==null||this.ValorTurno==""||this.ValorTurno==null){
    this.Alerta("Se deben llenar todos los campos", "warning", 3000);
  }else{
  this.PostAddProducto.AgregarProductos(data2).then(data =>{
    this.Alerta("Datos Guardatos", "secondary", 3000);
    this.ObtenerProductos();
    this.nombre="";
    this.precio="";
    this.descripcion="";
    this.ValorRestaurante="";
    this.ValorCate="";
    this.ValorTurno="";
  }).catch(error =>{
      console.log(error);
  });
  }
}

ObtenerIdUpdate(ids:any){
    this.id=ids;
    this.mostra=false;
    this.actu=true;
    console.log(this.id);
    for(let i=0; i < this.productos.length; i++){
      if(this.id==this.productos[i].id){
        this.Unombre=this.productos[i].nombre;
        this.Uprecio=this.productos[i].precio;
        this.Udescripcion=this.productos[i].descripcion;
        //this.UValorRestaurante= this.productos[i].idrestaurante;
        this.UValorCate=this.productos[i].idcategoria
        this.UValorTurno=this.productos[i].idturno;
        for(let item of this.Restaurantes){
          if(this.productos[i].idrestaurante==item['id']){
            this.rest=item['nombre'];
          }
        }
      }
    }

}


actualizar(){

  if(this.id==""|| this.id==null){
    this.mostra=true;
    this.actu=false;
    this.Alerta("Elija un producto para actualizar", "warning", 3000);
  }else{
    let data2 = {
      'nombre':this.Unombre,
      'precio':this.Uprecio,
      'descripcion': this.Udescripcion,
      'idrestaurante':this.UValorRestaurante,
      'idcategoria':this.UValorCate,
      'idturno': this.UValorTurno
    }
    if(this.Unombre==""||this.Unombre==null||this.Uprecio==""||this.Uprecio==null||this.Udescripcion==""||this.Udescripcion==null||this.UValorRestaurante==""||this.UValorRestaurante==null||this.UValorCate==""||this.UValorCate==null||this.UValorTurno==""||this.UValorTurno==null){
      this.Alerta("Se deben llenar todos los campos", "warning", 3000);
    }else{
    this.PostAddProducto.ActualizarProductos(data2, this.id).then(data =>{
      this.Alerta("Datos Actualizados", "secondary", 3000);
      this.ObtenerProductos();
      this.Unombre="";
      this.Uprecio="";
      this.Udescripcion="";
      this.UValorRestaurante="";
      this.UValorCate="";
      this.UValorTurno="";
      this.id="";
      this.rest="";
    }).catch(error =>{
        console.log(error);
    });
    }
  }

  

}


eliminar(id:any){
  this.PostAddProducto.EliminarProductos(id).then(data =>{
    this.Alerta("El producto se ha eliminado ", "warning", 3000);
    this.ObtenerProductos();
  }).catch(error=>{
    console.log(error);
  });
  
  }
  

}
