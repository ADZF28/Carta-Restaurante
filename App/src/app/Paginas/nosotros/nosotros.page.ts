import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestauranteService } from '../../Servicios/restaurante.service';


@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {
 @Input() id;
 @Input() nombre;

 informacion:any=[];

  constructor(private modalController:ModalController,
    private infoRestauran: RestauranteService) { }

  ngOnInit() {
    
    this.MostrarInformacion();
    console.log(this.id);
    console.log(this.nombre);

  }

  Cerrar(){
    this.modalController.dismiss();
  }

  MostrarInformacion() {
    
    this.infoRestauran.ObtenerInformacionRestaurante(this.id)
      .then((data) => {
        this.informacion = data['result'];
      }).catch((error) => {
        console.log(error);
      });
  }

}
