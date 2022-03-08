import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ValidatorService } from '../services/validator.service';
import { EmailValidatorService } from '../services/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

/**
 * INYECTAMOS EN EL CONSTRUCTOR EL FORMBUILDER, ROUTER, AUTHSERVICE, VALIDATORSERVICE Y EMAILVALIDATORSERVICE
 * @param fb 
 * @param router 
 * @param authService 
 * @param validatorService 
 * @param emailValidator 
 */
  constructor(  private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private validatorService:ValidatorService,
    private emailValidator:EmailValidatorService
    ) { }


    /**
     * CREAMOS UN FORMGROUP QUE CONTENDRA TODOS LOS ELEMENTOS DE NUESTRO USUARIO, COMPROBANDO TAMBIEN SUS VALIDACIONES
     */
  miFormulario: FormGroup = this.fb.group({
    name:      ['', [ Validators.required, Validators.minLength(3)]],
    lastname:  ['', [ Validators.required, Validators.minLength(3)]],
    dni:       ['', [ Validators.required, Validators.minLength(9), Validators.maxLength(9)],
                      Validators.pattern("^[a-z0-9_-]{8,15}$")
                    ],
    telephone: ['', [ Validators.required, Validators.minLength(9), Validators.maxLength(9),
                      Validators.min(600000000),Validators.max(899999999)]],
    email:     ['', [ Validators.required,  Validators.pattern(this.validatorService.emailPattern) ],[this.emailValidator]],
    password:  ['', [ Validators.required, Validators.minLength(4) ]],
    password2:  ['', [ Validators.required, Validators.minLength(4) ]],
    condiciones: [ false, Validators.requiredTrue ]
  },
  {
    validators: [
      this.validatorService.camposIguales('password','password2'),
    ]
  }
  );

  /**
   * NOS MUESTRA DIFERENTES ERRORES SEGUN QUE INTRODUZCAMOS DE EMAIL
   */
  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'Email is required';
    } else if ( errors['pattern'] ) {
      return 'The entered value does not have mail format';
    } else if ( errors['emailTomado'] ) {
      return 'The email has already been taken';
    }

    return '';
  } 
  

/**
 * RESETEAMOS LAS VARIABLES PARA CUANDO HAYA UN NUEVO REGISTRO NO PUEDAN DARNOS PROBLEMAS
 */
  ngOnInit(): void {
    this.miFormulario.reset({  
      name: '',
      lastname: '',
      dni: '',
      telephone: '',
      email: '',
      password: ''
    })
  }

  /**
   * COMPRUEBA SI LOS CAMPOS INTRODUCIDOS SON VALIDOS, Y SI TOCAS EL CAMPO Y SALES TE LO MARCA COMO TOCADO
   * @param campo 
   * @returns 
   */
  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }


 
/**
 * ENVIA EL FORMULARIO AL BACKEND PARA EL REGISTRO DEL USUARIO MEDIANTE UNA PETICIÓN POST QUE ENCONTRAMOS EN AUTHSERVICE
 */
  submitFormulario() {


   const user = this.miFormulario.value

   this.authService.register(user)
    .subscribe({
      next: (resp => {
        /**
 * RESETEAMOS LAS VARIABLES PARA CUANDO HAYA UN NUEVO REGISTRO NO PUEDAN DARNOS PROBLEMAS
 */
        this.miFormulario.reset({
          fullName: '',
          email: '',
          username: '',
          password: '',
          condiciones: false
        })
        this.router.navigateByUrl('/'); //va al home
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
