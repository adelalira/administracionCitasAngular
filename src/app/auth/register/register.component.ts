import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    name:      ['', [ Validators.required]],
    lastName:  ['', [ Validators.required]],
    dni:       ['', [ Validators.required]],
    telephone: ['', [ Validators.required]],
    address:   ['', [ Validators.required]],
    email:     ['', [ Validators.required, Validators.email ]],
    password:  ['', [ Validators.required, Validators.minLength(4) ]],
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
                private router:Router
                //FALTA LLAMAR AL SERVICIO
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

  }
}
