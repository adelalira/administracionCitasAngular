import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';

import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    DataTablesModule,
    HttpClientModule
  ]
})
export class ServiciosModule { }
