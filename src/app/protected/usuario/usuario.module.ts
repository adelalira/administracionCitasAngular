import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { CitaModule } from './cita/cita.module';
import { DatosModule } from './datos/datos.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    CitaModule,
    DatosModule,
    SharedModule
  ]
})
export class UsuarioModule { }
