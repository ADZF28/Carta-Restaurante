import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantePageRoutingModule } from './restaurante-routing.module';

import { RestaurantePage } from './restaurante.page';
import { MenuComponent } from '../../Componentes/menu/menu.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantePageRoutingModule,
    PipesModule,

  ],
  declarations: [RestaurantePage,MenuComponent]
})
export class RestaurantePageModule {}
