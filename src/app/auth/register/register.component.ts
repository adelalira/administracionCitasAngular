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


  constructor(  private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private validatorService:ValidatorService,
    private emailValidator:EmailValidatorService
    ) { }


  miFormulario: FormGroup = this.fb.group({
    name:      ['', [ Validators.required, Validators.minLength(3)]],
    lastname:  ['', [ Validators.required, Validators.minLength(3)]],
    dni:       ['', [ Validators.required, Validators.minLength(9), Validators.maxLength(9)],
                      //Validators.pattern('[0-9]{8}[A-Z]{1}$')  //NO FUNCIONA
                    ],
    telephone: ['', [ Validators.required, Validators.minLength(9), Validators.maxLength(9),
                      Validators.min(600000000),Validators.max(899999999)]],
    email:     ['', [ Validators.required, Validators.email ],[this.emailValidator]],
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

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'Email es obligatorio';
    } else if ( errors['pattern'] ) {
      return 'El valor ingresado no tiene formato de correo';
    } else if ( errors['emailTomado'] ) {
      return 'El email ya fue tomado';
    }

    return '';
  } 
  


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

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }


 

  submitFormulario() {

    console.log(this.miFormulario.value);

   // this.miFormulario.markAllAsTouched();

   const user = this.miFormulario.value

   this.authService.register(user)
    .subscribe({
      next: (resp => {
        this.router.navigateByUrl('/'); //va al home
        localStorage.setItem('token',resp.access_token!)
     }),
      error: resp => {
        console.log(resp);
        
        Swal.fire('Error', resp.error.message, 'error')
      }
   });
    

  }
}
