import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AbstractControl, AsyncValidator, ValidationErrors, } from '@angular/forms';
import { Usuario } from '../interface/usuario';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

   /**
   * VARIABLE PARA GUARDAR LA RUTA
   */
  private baseUrl: string = environment.baseUrl;
  
  /**
   * CONSTRUCTOR DONDE LLAMAMOS A HTTPCLIENTE PAR PODER HACER PETICIONES
   * @param http 
   */
  constructor(private http:HttpClient) { }

/**
 * ESTE METODO COMPRUEBA SI EL EMAIL INTRODUCIDO EN EL CAMPO DE REGISTRO ESTA EN LA BASE DE DATOS MEDIANTE EL METODO 
 * QUE ESTA ABAJO LLAMADO COMPRUEBAEMAIL
 * @param control 
 * @returns 
 */
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
      
    return this.compruebaEmail(email).pipe(
      map (resp => {
        if(resp.email != null){
           return {emailTomado: true};
        }else{
         return null;
        }
      }),
      catchError (err => {
         return of(null);
      })
    );
    
   }

  /**
   * ESTA PETICIÓN ES LA QUE COMPRUEBA SI EL EMAIL YA EXISTE
   * @param email 
   * @returns 
   */
  compruebaEmail(email:string){
    const url = `${this.baseUrl}/auth/user/email/${email}`;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.get<Usuario>(url,{headers:opcion});
  }

}
