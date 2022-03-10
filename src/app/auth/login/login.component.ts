import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * VARIABLES QUE RECIBEN LOS DATOS DE EMAIL Y PASSWORD DEL HTML
   */
  email !: string;
  password !: string;

  fontSize = 20;

  /**
   * INYECTAMOS EN EL CONSTRUCTOR ROUTER Y AUTHSERVICE
   * @param router 
   * @param authService 
   */
    constructor(  private router:Router, 
                  private authService: AuthService
                  ) { }
  
    ngOnInit(): void {
    }
  
    /**
     * METODO QUE LLAMA A AL AUTHSERVICE PARA HACER LOGIN, ENVIANDOLE EL EMAIL Y CONTRASELA.
     * SI EL USUARIO Y CONTRASEÑA ESTUVIERA REGISTRADO NOS DEVOLVERIA UN TOKEN QUE GUARDAREMOS EN EL LOCALSTORAGE
     */
    login(){
      this.authService.login(this.email,this.password)
      .subscribe({
        next: (resp => {
          localStorage.setItem('token',JSON.stringify(resp.access_token))
          this.getIdUser();
       }),
        error: resp => {
          console.log(resp.message);
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
   * METODO QUE GUARDA LA ID DEL USUARIO EN EL LOCALSTORAGE.
   */
  getIdUser() {
    this.authService.loginGetIdUser().subscribe((resp) => {
      localStorage.setItem('userId', JSON.stringify(resp));
      this.router.navigateByUrl(`/protected/usuario/${resp}`);
    });
  }

  changeFont(operator:any){
    operator === '+' ? this.fontSize++ : this.fontSize--;
    document.getElementsByTagName('form')[0].style.fontSize  = `${this.fontSize}px`;
  }

}
