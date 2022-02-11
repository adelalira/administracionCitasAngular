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
    const body =  {
      "email":email, 
      "password":password
                  };
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body,{headers:opcion});

  }

  validarToken():Observable<AuthResponse>{
    const url = `${ this.baseUrl }/checkToken`; 

    const headers = new HttpHeaders()
    
      .set('Authorization', `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}` || '' );

      console.log(localStorage.getItem('token'));
    return this.http.get<AuthResponse>( url, { headers } )
        
  }


  register(user:Usuario){
    const url = `${this.baseUrl}/auth/register`;
    console.log(user);
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, user,{headers:opcion});
  }
}
