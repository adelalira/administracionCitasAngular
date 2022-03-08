import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/services/servicios.service';
import Swal from 'sweetalert2';
import { ListaCita, Servicio} from '../../interface/lineaCitaServicio';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  /**
   * INYECTAMOS ROUTER, USUARIOSERVICE Y SERVICIOSSERVICE
   * @param router 
   * @param servicioDeUsuario 
   * @param servicioDeServicios 
   */
  constructor(  private router:Router, 
                private servicioDeUsuario:UsuarioService,
                private servicioDeServicios:ServiciosService) { }

  
  /**
   * INICIAMOS EL METODO MOSTRARSERVICIOS PARA QUE CARGEN LOS SERVICIOS AL CARGAR LA PAGINA
   */
  ngOnInit(): void {
    this.mostrarServicios();
  }



  

/**
 * CREAMOS LAS VARIABLES NECESARIAS
 */
  dia!:string;
  servicio:Servicio[]=[]
  cita:ListaCita[]=[];
  serviciosPedido:Servicio[]=[]


/**
 * METODO PARA PEDIR CITA, HACE UNA PETICIÓN POST QUE CREA UNA CITA SIN SERVICIO.
 */
  pedirCita(){
    this.servicioDeUsuario.enviarCita(this.dia)
    .subscribe({
      next: (resp => {
        this.cita=resp;
        Swal.fire({
          title:'Appointment is available',
          icon: 'success',
          confirmButtonColor:'#be8f8c'
        });
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
  /**
   * METODO PARA GUARDAR EL SERVICIO ELEGIDO POR EL USUARIO PARA SU CITA
   * @param servicio 
   */
  saveServicio(servicio:any){
    this.serviciosPedido=servicio;
  }

 /**
  * METODO QUE BUSCA LOS SERVICIOS PARA IMPRIMIRLOS Y QUE EL USUARIO PUEDA VERLOS
  */
  mostrarServicios(){
    this.servicioDeServicios.buscaServiciosOfrecidos().subscribe({
      next: (resp:any) => {
        this.servicio=resp;
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no services available at this time',
          confirmButtonColor:'#be8f8c'
        });
      }
    }
  )
}

 /**
   * METODO QUE REALIZA UNA PETICIÓN POST PARA AÑADIRLE A UNA CITA UN SERVICIO
   */
  addServicio(){
    if(this.cita==null){
      Swal.fire({
        title:'Error',
        icon: 'error',
        text:'You must first choose an available appointment',
        confirmButtonColor:'#be8f8c'

      });
    }
    this.servicioDeUsuario.addServicio(this.serviciosPedido,this.cita)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title:'Your appointment has been requested successfully',
          icon: 'success',
          confirmButtonColor:'#be8f8c'
        });

      this.router.navigateByUrl('/protected/usuario'); 
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
