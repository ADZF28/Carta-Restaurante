import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorPageRoutingModule } from './administrador-routing.module';

import { AdministradorPage } from './administrador.page';
import { MenuComponent } from '../../Componentes/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorPageRoutingModule
  ],
  declarations: [AdministradorPage, MenuComponent]
})
export class AdministradorPageModule {}
