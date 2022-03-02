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

  sendDad() {
    
    this.eventChild.emit(this.citaslongitud);
  }

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
