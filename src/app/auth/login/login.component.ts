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