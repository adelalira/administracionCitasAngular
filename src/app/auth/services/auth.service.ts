import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interface/auth-response';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.baseUrl; 

  constructor(private http: HttpClient) {}

  

  login(email:string, password: string){
    const url = `${this.baseUrl}/auth/login`;
    const body =  {email, password};
    return this.http.post<AuthResponse>(url, body);

  }

  validarToken():Observable<AuthResponse>{
    const url = `${ this.baseUrl }/products`;

    const headers = new HttpHeaders()
    
      .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );

    return this.http.get<AuthResponse>( url, { headers } )
    
    console.log('validar toke');
    
    // return of(false)
        
  }


  register(user:Usuario){
    const url = `${this.baseUrl}/auth/register`;
    console.log(user);
    return this.http.post<AuthResponse>(url, user);
  }
}
