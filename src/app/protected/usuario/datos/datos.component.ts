import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../../../auth/interface/usuario';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  constructor(private servicioDeUsuario: UsuarioService) { }

  usuario!:Usuario;

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
     
    this.servicioDeUsuario.buscaDatosUsuario()
    .subscribe({
      next: (resp => {
        this.usuario=resp;
        console.log(resp)
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
