import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  ProductosObtener(idResta:string) {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Producto/'+idResta;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
       //
      }, error => {
        debugger
        reject(error);
      });
    });
  }


  
  AllProductosObtener() {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Producto';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }

  AgregarProductos(data:any) {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Producto';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }

  ActualizarProductos(data:any,id:string) {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Producto/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }


  EliminarProductos(id:string) {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Producto/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }
  


}
