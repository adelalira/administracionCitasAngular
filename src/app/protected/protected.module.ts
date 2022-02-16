import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { UsuarioModule } from '../protected/usuario/usuario.module';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    UsuarioModule,
    HttpClientModule
  ],
  providers: [
    ValidarTokenGuard
  ]
})
export class ProtectedModule { }
