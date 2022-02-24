import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from 'src/app/guards/validar-token.guard';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
    { path: '', component: UsuarioComponent }, 
    { path: 'datos', loadChildren: () => import('./datos/datos.module').then(m => m.DatosModule) },
    { path: 'cita', loadChildren: () => import('./cita/cita.module').then(m => m.CitaModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
