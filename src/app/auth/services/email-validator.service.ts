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

  private baseUrl: string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);
    
    return this.compruebaEmail(email).pipe(
      map (resp => {
        console.log(resp);
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

  //Petición get para comprobar el email
  compruebaEmail(email:string){
    const url = `${this.baseUrl}/auth/user/${email}`;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.get<Usuario>(url,{headers:opcion});
  }

}
