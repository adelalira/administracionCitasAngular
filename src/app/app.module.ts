import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { ServiciosModule } from './servicios/servicios.module';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    BrowserAnimationsModule,
    ServiciosModule,
    SharedModule
  ],
  providers: [ValidarTokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
