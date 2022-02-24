import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitaRoutingModule } from './cita-routing.module';
import { CitaComponent } from './cita.component';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../interface/cita';


@NgModule({
  declarations: [
    CitaComponent
  ],
  imports: [
    CommonModule,
    CitaRoutingModule,
    FormsModule
  ],
  exports: [
    CitaComponent
  ]
})
export class CitaModule { }
