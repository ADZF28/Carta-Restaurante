import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private http:HttpClient) { }

  
  ObtenerIDRestaurante(Resta:string) {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Restaurante/'+Resta;
    //debugger
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


  ObtenerInformacionRestaurante(id:string) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/InfoRestaurante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  
  TodosRestaurante() {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Restaurante';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  TraerInfoRestaurante(id:string){
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/InfoRestaurante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  AgregarRestaurante(data: any) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Restaurante';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  AgregarInfoRestaurante(data: any) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/InfoRestaurante';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  EliminarRestaurante(id:string) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Restaurante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  EliminarInfoRestaurante(id:string) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/InfoRestaurante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  
  ModificarInfoRestaurante(data:any,id:string) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/InfoRestaurante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }
  ModificarRestaurante(data:any,id:string) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Restaurante/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }
 

}
