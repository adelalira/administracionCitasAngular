import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/services/servicios.service';
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
                private servicioDeUsuario:UsuarioService,
                private servicioDeServicios:ServiciosService) { }

  ngOnInit(): void {
    this.mostrarServicios();
  }



  


  dia!:string;
  servicios:Servicio[]=[]
  cita:any;

  visibleServicios:boolean=false;

  pedirCita(){
      
    this.servicioDeUsuario.enviarCita(this.dia)
    .subscribe({
      next: (resp => {
        console.log(resp)
        this.cita=resp;
        this.visibleServicios=true;
        //console.log(this.cita);


        this.router.navigateByUrl('/protected/usuario/datos'); 
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
      
    this.servicioDeServicios.buscaServiciosOfrecidos().subscribe({
      next: (resp:any) => {
     //   console.log("ok");
     //   console.log(resp); 
        this.servicios=resp;
     //   console.log(this.data);
      },
      error: (e) => {
        console.log(e);
        console.log("NO ok");
      }
    }
  )
}




  addServicio(id:any){
    this.servicioDeUsuario.addServicio(id,this.cita)
    .subscribe({
      next: (resp => {
        console.log(resp)
        Swal.fire({
          title:'Your appointment has been requested successfully',
          icon: 'success',
        });

      this.router.navigateByUrl('/protected/usuario'); 
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
