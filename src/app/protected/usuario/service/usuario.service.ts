import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from 'src/app/auth/interface/auth-response';
import { Usuario } from 'src/app/auth/interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private baseUrl: string = environment.baseUrl; 

  constructor(private http:HttpClient) { }


  buscaDatosUsuario(){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/auth/user/${id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(url, {headers});
  }


}
