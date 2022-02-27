import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';

import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    DataTablesModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ServiciosModule { }
