import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorPageRoutingModule } from './administrador-routing.module';

import { AdministradorPage } from './administrador.page';
import { MenuComponent } from '../../Componentes/menu/menu.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [AdministradorPage, MenuComponent]
})
export class AdministradorPageModule {}
