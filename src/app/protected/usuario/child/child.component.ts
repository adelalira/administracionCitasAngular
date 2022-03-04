import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Cita } from '../../interface/cita';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.appointmentUser();
  }

  citaslongitud!:any;

  
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
        console.log(resp)
        this.citaslongitud=resp.length;
       
     }),
      error: resp => {
        console.log(resp.message);
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:resp.error.mensaje
        });
      }
   });
  }

}
