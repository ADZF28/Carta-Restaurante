import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http:HttpClient) { }

  AgregarRestaurante(data: any) {
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Imagen';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
