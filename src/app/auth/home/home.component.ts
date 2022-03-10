import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { EmailValidatorService } from '../services/email-validator.service';
import { ValidatorService } from '../services/validator.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * CONSTRUCTOR QUE INYECTA EL FORMBUILDER, ROTER Y AUTHSERVICE
   * @param fb 
   * @param router 
   * @param authService 
   */
  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService) { }

  fontSize = 20;

  /**
   * CREAMOS UNA VARIABLE MIFORMULARIO DONDE METIMOS TODOS LOS ATRIBUTOS DE MENSAJE PARA VALIDARLOS
   */
  miFormulario: FormGroup = this.fb.group({
    subject:  ['', [ Validators.required, Validators.minLength(3)]],
    text:       ['', [ Validators.required,  Validators.minLength(10)]]
  });


  /**
   * RESETEAMOS LAS VARIABLES PARA QUE SE INICIEN VACIAS
   */
  ngOnInit(): void {
    this.miFormulario.reset({  
      Subject: '',
      text: ''  
    })
  }


  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }


 
  /**
   * METODO QUE ENVIA AL SERVICIO EL FORMULARIO PARA QUE HAGA LA PETICIÓN CORRESPODIENTE, EN ESTE CASO ENVIARE 
   * EL ASUNTO Y EL CUERPO DEL EMAIL. UNA VEZ RECIBAMOS LA RESPUESTA SI ES CORRECTA SE VACIAN LAS VARIABLES.
   * EN CASO DE QUE EL EMAIL NO SE ENVIE NOS SALTARA UNA ALERTA SWAL
   */
  submitFormulario() {

    console.log(this.miFormulario.value);

   const message = this.miFormulario.value
   this.authService.contact(message)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title:'Your email has been requested successfully',
          icon: 'success',
          confirmButtonColor:'#be8f8c'
        });
        //reseteamos el formulario
        this.miFormulario.reset({
         // to: '',
          subject: '',
          text: ''
        })

        this.router.navigateByUrl('/'); 
        
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

  changeFont(operator:any){
    operator === '+' ? this.fontSize++ : this.fontSize--;
    document.getElementsByTagName('p')[0].style.fontSize  = `${this.fontSize}px`;
    document.getElementsByTagName('p')[1].style.fontSize  = `${this.fontSize}px`;
    document.getElementsByTagName('h1')[0].style.fontSize  = `${this.fontSize}px`;
  }


}
