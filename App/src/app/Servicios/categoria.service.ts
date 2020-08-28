import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
  
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  

  CategoriaObtener() {
   
    let  url = 'http://127.0.0.1:8000/api/Categoria';
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
