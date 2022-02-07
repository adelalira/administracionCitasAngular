import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios.component';

const routes: Routes = [{ path: '', component: ServiciosComponent }, { path: 'servicio', loadChildren: () => import('./servicio/servicio.module').then(m => m.ServicioModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
