import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [RegisterComponent,LoginComponent, MainComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HomeModule
  ],
  exports: [RegisterComponent,LoginComponent, MainComponent]
})
export class AuthModule { }
