import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:id/:nombre',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
 
  {
    path: '',
    loadChildren: () => import('./Paginas/escaneo/escaneo.module').then( m => m.EscaneoPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./Paginas/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'restaurante',
    loadChildren: () => import('./Paginas/restaurante/restaurante.module').then( m => m.RestaurantePageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./Paginas/producto/producto.module').then( m => m.ProductoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
