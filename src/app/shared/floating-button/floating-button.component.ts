import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {

  /**
   * ESTE INPUT SERA EL QUE RECIBA LA INFORMACIÓN DE LAS PÁGINAS PARA QUE SE VISUALICEN EN EL BOTÓN FLOTANTE Y
   * EL USUARIO PUEDA SABER EN TODO MOMENTO DONDE ESTA
   */
  @Input() ubicacion: string = '';
 
  /**
   * VARIABLE BOOLEAN PARA QUE SE VEA EL BOTÓN FLOTANTE CUANDO BAJAMOS
   */
  windowScrolled: boolean | undefined;

  ngOnInit(): void {
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}
  
  /**
   * ESTE METODO ES EL QUE HACE EL BOTÓN FLOTANTE SE PUEDA VER CUANDO SE BAJA LA PÁGINA Y DEJE DE VERSE
   * CUANDO ESTAMOS EN LA APRTE SUPERIOR
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

  /**
   * ESTE METODO MODIFICA LA VELOCIDAD DE LA ANIMACIÓN DEL BOTÓN, ES DECIR, LO RAPIDO QUE SUBE LA PÁGINA
   */
  scrollToTop(): void {
      (function smoothscroll(): void {
          const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 1.5));
          }
      })();
  }

}
