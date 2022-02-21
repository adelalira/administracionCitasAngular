import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdministradosDeCitas';


  public subscriber!: Subscription; 
   registrado: boolean = false;


   constructor(private router: Router) {
    //Si me suscribo al router con un tipo de navegación, siempre comprobará el router (osea siempre que cambie de página).
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
    //    console.log(event);
        this.compruebaRuta();
      });
  }

  compruebaRuta() {
    //Si la ruta contiene userDashboard indica que está logueado
   // console.log(this.router.url);
    if (this.router.url.includes('protected/usuario')) {
      this.registrado = true;
    }else{
      this.registrado = false;
    }
  }

  //En el onDestroy, valido si mi subscriber sigue activo y me desuscribo, si no seguirá activo escuchando cuando navegue a otro componente donde no lo quiera.
  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  deletetoken(){
    localStorage.clear();
  }


}
