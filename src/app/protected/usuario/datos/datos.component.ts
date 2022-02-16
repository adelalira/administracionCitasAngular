import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  constructor(private servicioDeUsuario: UsuarioService) { }

  ngOnInit(): void {
    
  }

  cargarDatos(){
    this.servicioDeUsuario.buscaDatosUsuario();
  }
  

}
