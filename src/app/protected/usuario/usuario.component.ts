import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interface/usuario';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { CitaComponent } from './cita/cita.component';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html', //'./usuario.component.html'
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  /**
   * INYECTAMOS AUTHSERVICE, ROUTER Y USERSERVICE
   * @param authService 
   * @param router 
   * @param servicioDeUsuario 
   */
  constructor(private authService:AuthService,
              private router:Router,
              private servicioDeUsuario: UsuarioService) { }

    /**
     * CREAMOS UNA VARIABLES BOOLEAN QUE NOS PERMITEN JUGAR CON LA VISIBILIDAD DE LOS ELEMENTOS DE LA PÁGINA
     */
    imgVisible:boolean=true;
    dataVisible:boolean=false;
    dateVisible:boolean=false;
    hijoVisible:boolean=false;
    buttonBack:boolean=false;

    /**
     * CREAMOS UN USUARIO CON TODOS SUS ATRIBUTOS
     */
    usuario:Usuario = {name:"",lastname:"",dni:"",telephone:0,email:"",password:""};

    /**
     * CARGAMOS LOS DATOS DEL USUARIO AL INICIAR LA PÁGINA
     */
  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  /**
   * VARIABLE DONDE GUARDAREMOS EL MENSAJE QUE VIENE DEL HIJO
   */
  messageChild!:string;

  /**
   * METODO QUE PASA EL MENSAJE DEL HIJO A UNA VARIABLE CREADA POR NOSOTROS (MESSAGECHILD)
   * @param message 
   */
  onMessageChild(message:any) {
    this.messageChild=message;
   }

   /**
    * METODO QUE JUEGA CON LA VISIBILIDAD PARA MOSTRAR LA ZONA DE USUARIO PRINCIPAL
    */
   zoneUser(){
    this.imgVisible=true;
    this.dataVisible=false;
    this.dateVisible=false;
    this.buttonBack=false;
   }

   /**
    * METODO QUE NOS COMPRUEBA SI EL TOKEN ES VALIDO, ESTO NOS SIRVE PARA SABER SI ALGUIEN HA INICIADO SESIÓN.
    */
  checkToken(){
    this.authService.validarToken()
    .subscribe({
      next: () => console.log('Token válido'),
      error: resp => {

        this.router.navigateByUrl('/auth/login')
        
      } 
    }
    )
  }

  /**
    * METODO QUE JUEGA CON LA VISIBILIDAD PARA MOSTRAR LA ZONA DE USUARIO PARA PEDIR CITAS
    */
  askDate(){
    this.imgVisible=false;
    this.dateVisible=true;
    this.dataVisible=false;
    this.buttonBack=true;
  }

  /**
    * METODO QUE JUEGA CON LA VISIBILIDAD PARA MOSTRAR LA ZONA DE USUARIO PARAVER SUS DATOS
    */
  datas(){
    this.imgVisible=false;
    this.dataVisible=true;
    this.dateVisible=false;
    this.buttonBack=true;
    
  }

  /**
   * METODO QUE CARGA LOS DATOS DEL USUARIO PARA IMPRIMIR SU NOMBRE
   */
  cargarDatosUsuario(){
     
    this.servicioDeUsuario.buscaDatosUsuario()
    .subscribe({
      next: (resp => {
        this.usuario=resp;
        
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
