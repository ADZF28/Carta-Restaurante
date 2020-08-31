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
    path: 'nosotros',
    loadChildren: () => import('./Paginas/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./Paginas/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
