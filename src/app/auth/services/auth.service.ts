import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interface/auth-response';
import { Message } from '../interface/mesagge';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 /**
   * VARIABLE PARA GUARDAR LA RUTA
   */
  private baseUrl: string = environment.baseUrl; 

  /**
   * CONSTRUCTOR DONDE LLAMAMOS A HTTPCLIENTE PAR PODER HACER PETICIONES
   * @param http 
   */
  constructor(private http: HttpClient) {}

  
  /**
   * METODO QUE REALIAZ UNA PETICIÓN AL BACKEND DONDE ENVIAMOS EL EMAIL Y CONTRASEÑA PARA HACE LOGIN. 
   * TAMBIEN LE AÑADIMOS LA CABECERA CORS
   * @param email 
   * @param password 
   * @returns 
   */
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

  /**
   * METODO QUE VALIDA EL TOKEN PARA CONOCER SI AUN SIGUE SIENDO VALIDO.
   * LE ENVIAMOS EL TOKEN EN LA CABECERA
   * @returns 
   */
  validarToken():Observable<AuthResponse>{
    const url = `${ this.baseUrl }/checkToken`; 

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${JSON.parse(<string>localStorage.getItem('token'))}` || '' );
    
    return this.http.get<AuthResponse>( url, { headers } )
        
  }

  /**
   * METODO POST PARA REGISTRAR USUARIO.
   * ENVIAMOS EN LA CABECERA EL CORS.
   * @param user 
   * @returns 
   */
  register(user:Usuario){
    const url = `${this.baseUrl}/auth/register`;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, user,{headers:opcion});
  }


  /**
   * PEDICION GET QUE NOS MUESTRA TODOS LOS DATOS DEL USUARIO
   * @returns 
   */
  loginGetIdUser(){
    const url = `${this.baseUrl}/auth/user`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<AuthResponse>(url, {headers});
  }

  /**
   * METODO QUE ENVIA EL MENSAJE DEL CONTACT US AL BACKEND QUE SERA EL ENCARGADO DE ENVIAR EL CORREO
   * @param message 
   * @returns 
   */
  contact(message:Message){
    const url = `${this.baseUrl}/sendMail`;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<Message>(url, message,{headers:opcion});
  }

}
