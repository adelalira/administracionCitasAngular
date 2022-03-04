import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  /**
   * CREAMOS UNOS PATTHERN PARA EL EMAIL Y EL NOMBRE
   */
  public namePattern: string = '([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  
  constructor() { }

  /**
   * METODO QUE COMPRUEBA SI LAS CONTRASEÑAS QUE HEMOS INTRODUCIDO SON IGUALES O NO
   * @param campo1 
   * @param campo2 
   * @returns 
   */
  camposIguales( campo1: string, campo2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const password = formGroup.get(campo1)?.value;
      const password2 = formGroup.get(campo2)?.value;

      if ( password !== password2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 
      formGroup.get(campo2)?.setErrors(null);

      return null
    }
  }
}
