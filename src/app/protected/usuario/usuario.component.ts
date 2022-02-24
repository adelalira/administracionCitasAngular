import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private authService:AuthService,
    private router:Router) { }

    imgVisible:boolean=true;
    dataVisible:boolean=false;
    dateVisible:boolean=false;

  ngOnInit(): void {
  }

  checkToken(){
    this.authService.validarToken()
    .subscribe({
      next: () => console.log('Token válido'),
      error: resp => {
        console.log(resp.error.message);
        console.log("FALLA AQUI 2");
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
}
