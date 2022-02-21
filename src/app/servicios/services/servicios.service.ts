import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Servicio } from '../interface/servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private baseUrl: string = environment.baseUrl; 
  
  constructor(private http:HttpClient) { }


  buscaServiciosOfrecidos():Observable<Servicio>{

    const url = `${ this.baseUrl }/servicios`; 

    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
  
    return this.http.get<Servicio>(url,{headers:opcion})   
  }


}
