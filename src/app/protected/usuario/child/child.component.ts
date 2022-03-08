import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  /**
   * INYECTAMOS EL SERVICIO DEL USUARIO
   * @param userService 
   */
  constructor(private userService: UsuarioService) { }

  /**
   * LLAMAMOS AL METODO APPOINTMENUSER CUUANDO SE CARGELA PÁGINA PARA HACER UNA PETICIÓN GET QUE NOS RECUPERE LAS CITAS
   */
  ngOnInit(): void {
    this.appointmentUser();
  }

/**
 * CREAMOS UNA VARIABLE PARA INTRODUCIR EL NUMERO DE CITAS DEL USUARIO
 */
  citaslongitud!:any;

  /**
   * HACEMOS UN EVENTO OUTPUT QUE LLAMAMOS EVENTCHILD
   */
  @Output()
  eventChild = new EventEmitter<string>();

  /**
   * METODO QUE EMITE EL EVENTO, INDICAMOS QUE ES LO QUE LE MANDAMOS AL PADRE
   */
  sendDad() {
    this.eventChild.emit(this.citaslongitud);
  }

  /**
   * BUSCAMOS LAS CITAS QUE TIENE EL USUARIO PARA SABER CUANTAS TIENE Y MANDARLAS AL PADRE (USUARIO)
   */
  appointmentUser(){
    this.userService.buscaCitasUsuario()
    .subscribe({
      next: (resp => {
        this.citaslongitud=resp.length;
       
     }),
      error: resp => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:resp.error.mensaje,
          confirmButtonColor:'#be8f8c'
        });
      }
   });
  }

}
