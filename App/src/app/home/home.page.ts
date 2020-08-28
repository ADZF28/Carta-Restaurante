import { Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CategoriaService } from '../Servicios/categoria.service';
import { ProductoService } from '../Servicios/producto.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  buscar:boolean=false;
  cate:any[];
  productos:any[];
  productosCate:any[]=[""];
  IdRestaurante:string="1";
  TodosProductos:boolean=true;
  FiltroProductos:boolean=false;
  index:number;
  constructor(
    private menu: MenuController,
    private Categoria:CategoriaService, 
    private Producto:ProductoService
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
  
  ngOnInit(){
    this.CargarCategoria();
    this.MostrarProductos();
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
  Cambiocat(){
    debugger
    this.TodosProductos=false;
    this.FiltroProductos=true;
    this.productosCate=null;
    if (this.productos.length > 0) {
      for (let data of this.productos) {
        if(data['idcategoria']=="1"){

          
          this.productosCate.push(data);
        }
        this.index++;
      }

      
    } else {

      
    }
  }

  MostrarProductos() {
    
    this.Producto.ProductosObtener(this.IdRestaurante)
      .then((data) => {
        this.productos = data["result"];
              
      })
      .catch((error) => {
        debugger
        console.log(error);
      });
    
  }
  
}
