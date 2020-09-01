import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http:HttpClient) { }

 TurnoObte() {
   
    let  url = 'https://pacific-brook-35350.herokuapp.com/api/Turno';
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
