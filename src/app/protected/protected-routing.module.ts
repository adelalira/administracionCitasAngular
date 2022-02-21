import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../guards/validar-token.guard';

const routes: Routes = [
  { 
    path: 'usuario', canActivate:[ValidarTokenGuard], loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) 
  },  
  { 
      path: 'usuario/:id', canActivate:[ValidarTokenGuard], loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) 
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
