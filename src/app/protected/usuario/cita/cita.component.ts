import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Servicio } from '../../interface/servicios';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  constructor(  private router:Router, 
                private servicioDeUsuario:UsuarioService) { }

  ngOnInit(): void {
  }

  dia!:string;
  servicios:Servicio[]=[]

  pedirCita(){
      
    this.servicioDeUsuario.enviarCita(this.dia)
    .subscribe({
      next: (resp => {
        console.log(resp)
        Swal.fire({
          title:'Your appointment has been requested successfully',
          icon: 'success',
        });
        //this.router.navigateByUrl('/protected/usuario/datos'); 
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

  mostrarServicios(){
      
  this.servicioDeUsuario.getServicios()
  .subscribe({
    next: (resp => {
      console.log(resp)
      this.servicios=resp;
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
