import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../../../auth/interface/usuario';
import { Cita } from '../../interface/cita';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  constructor(private servicioDeUsuario: UsuarioService) { }

  usuario:Usuario = {name:"",lastname:"",dni:"",telephone:0,email:"",password:""};
  citas:Cita[]=[];

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.cargarCitasUsuario();
  }

  cargarDatosUsuario(){
     
    this.servicioDeUsuario.buscaDatosUsuario()
    .subscribe({
      next: (resp => {
        this.usuario=resp;
        //console.log(resp)
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
  

  cargarCitasUsuario(){
    this.servicioDeUsuario.buscaCitasUsuario()
    .subscribe({
      next: (resp => {
        console.log(resp)
        this.citas=resp;
       
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


  cancelDate(idC:number){
    this.servicioDeUsuario.cancelDate(idC)
    .subscribe({
      next: (resp => {
        console.log(resp)
        this.cargarCitasUsuario();
       
     }),
      error: resp => {
        console.log(resp.message);
        if(resp.message==null){
          this.cargarCitasUsuario();
        }
        else{
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:resp.error.mensaje
          });
        }
       
      }
   });
  }


}
