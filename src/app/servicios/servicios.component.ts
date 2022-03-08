import { Component, OnDestroy,  OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiciosService } from './services/servicios.service';
import { Servicio } from './interface/servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnDestroy, OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger= new Subject<any>();


  /**
   * CREAMOS UN ARRAY DE TIPO SERVICIO PARA CADA UNO DE NUESTROS TIPOS
   */
  nails:Servicio[]=[];
  hair:Servicio[]=[];
  eyelash:Servicio[]=[];
  eyebrows:Servicio[]=[];

  /**
   * CREAMOS UN ARRAY DONDE GUARDEMOS TODOS LOS SERVICIOS QUE RECIBIMOS
   */
  servicios:Servicio[]=[];

  /**
   * METODO QUE SE ENCARGA DE FILTRAR LOS SERVICIOS REBIDOS DESDE EL BACK END Y SEGUN EL TIPO QUE RECIBA LO
   * METE EN UNA LISTA DIFERENTE
   */
  types(){
    this.nails = this.servicios.filter(i => i.tipo == "Nails");
    this.hair = this.servicios.filter(i => i.tipo == "Hair removal");
    this.eyelash = this.servicios.filter(i => i.tipo == "Eyelash");
    this.eyebrows = this.servicios.filter(i => i.tipo == "Eyebrows");
  
    
  }

  /**
   * CONSTRUCTOR DESDE EL QUE LLAMAMOS AL SERVICIO DE LOS SERVICIOS
   * @param serviciosService 
   */
  constructor(private serviciosService:ServiciosService) { }

  /**
   * VARIABLE DONDE GUARDAREMOS LOS SERVICIOS OBTENIDOS POR LA PETICIÓN
   */
  data!: Servicio[];

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /**
   * INDICAMOS QUE NUESTRA TABLA TENDRA UN TOTAL DE 5 ELEMENTOS Y LLAMAMOS A CARGA, METODO QUE HACE UNA PETICIÓN GET
   * PARA OBTENER TODOS LOS SERVICIOS
   */
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.carga();
   
  }

  /**
   * METODO QUE LLAMA AL SERVICIO PARA OBTENER LOS SERVICIOS
   */
  carga(){
    this.serviciosService.buscaServiciosOfrecidos().subscribe({
      next: (resp:any) => {
     //   console.log("ok");
     //   console.log(resp); 
        this.data=resp;
        this.servicios=resp;
       console.log(this.data);
       this.types();
        this.dtTrigger.next(null);
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no services available at this time',
          confirmButtonColor:'#be8f8c'
        });
      }
    }
  )}


}

  

