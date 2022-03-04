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

  /**
   * INYECTAMOS USUARIOSERVICE
   * @param servicioDeUsuario 
   */
  constructor(private servicioDeUsuario: UsuarioService) { }
/**
 * CREAMOS UN USUARIO Y CITA
 */
  usuario:Usuario = {name:"",lastname:"",dni:"",telephone:0,email:"",password:""};
  citas:Cita[]=[];

  /**
   * AL CARGAR LA PAGINA INICIAMOS LOS METODOS CARGARDATOSUSUARIO Y CARGARCITASUSUARIO QUE NOS MUESTRA LOS DATOS
   * DEL USUARIO Y SUS CITAS
   */
  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.cargarCitasUsuario();
  }

  /**
   * METODO QUE HACE UNA PETICIÓN GET AL BACK PARA RECIBIR TODOS LOS DATOS DEL USUARIO
   */
  cargarDatosUsuario(){
    this.servicioDeUsuario.buscaDatosUsuario()
    .subscribe({
      next: (resp => {
        this.usuario=resp;
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
  
 /**
   * METODO QUE HACE UNA PETICIÓN GET AL BACK PARA RECIBIR TODAS LAS CITAS DEL USUARIO
   */
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

  /**
   * METODO DELETE PARA CANCELAR LA CITA QUE ELIJAMOS
   */
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
            text:'The selected appointment could not be deleted'
          });
        }
       
      }
   });
  }


}
