import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { PipesModule } from '../../pipes/pipes.module';
import { MenuComponent } from '../../Componentes/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    PipesModule
  ],
  declarations: [ProductoPage, MenuComponent]
})
export class ProductoPageModule {}
