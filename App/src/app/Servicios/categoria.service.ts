import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
  
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  

  CategoriaObtener() {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Categoria';
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

  
}
