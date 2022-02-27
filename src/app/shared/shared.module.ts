import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { FloatingButtonComponent } from './floating-button/floating-button.component';



@NgModule({
  declarations: [
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    NavbarModule
  ],
  exports:[
    FloatingButtonComponent
  ]
})
export class SharedModule { }
