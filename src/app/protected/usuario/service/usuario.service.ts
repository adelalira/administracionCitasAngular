import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from 'src/app/auth/interface/auth-response';
import { Usuario } from 'src/app/auth/interface/usuario';
import { Cita, ListaCita, ListaServicio } from '../../interface/lineaCitaServicio';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private baseUrl: string = environment.baseUrl; 

  constructor(private http:HttpClient) { }


  buscaDatosUsuario(){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/user`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(url, {headers});
  }


  buscaCitasUsuario(){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/cita`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<ListaCita[]>(url, {headers});
  }

  cancelDate(idC:number){
    let id = localStorage.getItem('userId');
     const url = `${this.baseUrl}/cita/${idC}/delete`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete<Cita[]>(url, {headers});
  }

  mostrarInfo(idC:number){
    let id = localStorage.getItem('userId');
     const url = `${this.baseUrl}/cita/${idC}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<ListaServicio[]>(url, {headers});
  }

  enviarCita(dia:string){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/cita`; //CAMBIAR
    const body =  {
      "dia":dia
                  };
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<ListaCita[]>(url, body,{headers:opcion});
  }

  addServicio(servicio:any, cita:any){
    let id = localStorage.getItem('userId');
    let idC = cita.id;
    const url = `${this.baseUrl}/cita/${idC}/lineaCitaServicio`; //CAMBIAR
    
    const body =  servicio;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<ListaServicio[]>(url, body,{headers:opcion});
  }

  deleteAccount(){
    let id = localStorage.getItem('userId');
    const url = `${this.baseUrl}/delete`;
   let token = JSON.parse(<string>localStorage.getItem('token'));
   const headers = new HttpHeaders()
     .set('Authorization', `Bearer ${token}`);
   return this.http.delete<Usuario[]>(url, {headers});
  }

}
