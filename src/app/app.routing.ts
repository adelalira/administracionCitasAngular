import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from 'login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    },
    {
      path: '**',
      redirectTo: 'auth'
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}