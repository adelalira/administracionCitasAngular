import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { CitaModule } from './cita/cita.module';
import { DatosModule } from './datos/datos.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChildComponent } from './child/child.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    ChildComponent
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
