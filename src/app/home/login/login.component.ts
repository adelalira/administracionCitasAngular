import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    /*this.authService.login(this.email,this.password)
    .subscribe( resp => {
      console.log(resp);
      localStorage.setItem('jwt',JSON.stringify(resp));

      this.router.navigateByUrl('/servers');
    },(error)=>{
      Swal.fire('El usuario o contraseña es erroneo');
    }
    
    )*/
  }

  


}
