import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { UsuarioModule } from '../protected/usuario/usuario.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    UsuarioModule
  ]
})
export class ProtectedModule { }
