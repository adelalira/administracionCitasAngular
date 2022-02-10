import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { ProtectedModule } from './protected/protected.module';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    },
    { 
        path: 'servicios', 
        loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule) 
    },
    { 
        path: 'protected', canActivate:[ValidarTokenGuard] ,
        loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule) 
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