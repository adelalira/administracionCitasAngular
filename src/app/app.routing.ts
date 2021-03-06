import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { ProtectedModule } from './protected/protected.module';
import { ServiciosModule } from './servicios/servicios.module';


const routes: Routes = [
    {
        path: '',
        loadChildren:()=>import('./auth/home/home.module').then(m=>m.HomeModule)
    },
    {
        path: 'auth',
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    },
    { 
        path: 'protected', canActivate:[ValidarTokenGuard] ,
        loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule) 
    },
    { path: 'servicios', loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule) },
    {
        path: '**',
        redirectTo: '' 
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes), ServiciosModule],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}