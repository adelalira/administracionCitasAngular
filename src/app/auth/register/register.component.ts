import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name:      ['', [ Validators.required, Validators.minLength(3)]],
    lastName:  ['', [ Validators.required, Validators.minLength(3)]],
    dni:       ['', [ Validators.required, Validators.minLength(9), Validators.maxLength(9)],
                      //Validators.pattern('[0-9]{8}[A-Z]{1}$')  //NO FUNCIONA
                    ], 
    age:       ['', [ Validators.required]],
    telephone: ['', [ Validators.required, Validators.minLength(9), Validators.maxLength(9),
                      Validators.min(600000000),Validators.max(899999999)]],
    address:   ['', [ Validators.required, Validators.minLength(3)]],
    email:     ['', [ Validators.required, Validators.email ]],
    password:  ['', [ Validators.required, Validators.minLength(4) ]],
    password2:  ['', [ Validators.required, Validators.minLength(4) ]]
  });


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
  
  constructor(  private fb:FormBuilder,
                private router:Router,
                private authService:AuthService
                ) { }

  ngOnInit(): void {
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }


  submitFormulario() {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();

   /* this.authService.register(this.miFormulario.value)
    .subscribe({
      next: (resp => {
        this.router.navigateByUrl('/'); //va al home
     }),
      error: resp => {
        console.log(resp);
        
        Swal.fire('Error', resp.error.message, 'error')
      }
   });
    */

  }
}
