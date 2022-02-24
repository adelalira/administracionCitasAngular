import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from 'src/app/auth/interface/auth-response';
import { Usuario } from 'src/app/auth/interface/usuario';
import { Cita } from '../../interface/cita';
import { Servicio } from '../../interface/servicios';

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


  buscaCitasUsuario(){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/user/${id}/cita`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<Cita[]>(url, {headers});
  }

  cancelDate(idC:number){
    let id = localStorage.getItem('userId');
     const url = `${this.baseUrl}/user/${id}/cita/${idC}/delete`;
    console.log(url)
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete<Cita[]>(url, {headers});
  }

  enviarCita(dia:string){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/user/${id}/cita`; //CAMBIAR
    const body =  {
      "dia":dia
                  };
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<Cita[]>(url, body,{headers:opcion});
  }


  getServicios(){
    const url = `${this.baseUrl}/servicios`;
    return this.http.get<Servicio[]>(url);
  }


}
