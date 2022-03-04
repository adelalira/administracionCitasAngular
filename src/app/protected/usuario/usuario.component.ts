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

  constructor(private authService:AuthService,
              private router:Router,
              private servicioDeUsuario: UsuarioService) { }

    imgVisible:boolean=true;
    dataVisible:boolean=false;
    dateVisible:boolean=false;
    hijoVisible:boolean=false;

    usuario:Usuario = {name:"",lastname:"",dni:"",telephone:0,email:"",password:""};

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  messageChild!:string;

  onMessageChild(message:any) {
    this.messageChild=message;
   }





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

  askDate(){
    this.imgVisible=false;
    this.dateVisible=true;
    this.dataVisible=false;
  }

  datas(){
    this.imgVisible=false;
    this.dataVisible=true;
    this.dateVisible=false;
    
  }

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
  



}
