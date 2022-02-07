import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../interface/usuario.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

 email !: string;
password !: string;


  constructor(  private router:Router, 
                private authService: AuthService
                ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.email,this.password)
    .subscribe({
      next: (resp => {
        localStorage.setItem('token',resp.access_token!)
        this.router.navigateByUrl('/auth/register');
     }),
      error: resp => {
        console.log(resp);
        
        Swal.fire('Error', resp.error.message, 'error')
      }
   });
}


}
