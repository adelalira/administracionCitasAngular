import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    },
    { 
        path: 'usuarios', 
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) 
    },
    { 
        path: 'servicios', 
        loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule) 
    },
    {
        path: '**',
        redirectTo: 'home' 
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}