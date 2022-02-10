import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { UsuarioModule } from '../protected/usuario/usuario.module';
import { ValidarTokenGuard } from '../guards/validar-token.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    UsuarioModule
  ],
  providers: [
    ValidarTokenGuard
  ]
})
export class ProtectedModule { }
