import { Component, OnDestroy,  OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiciosService } from './services/servicios.service';
import { Servicio } from './interface/servicio';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnDestroy, OnInit {


  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger= new Subject<any>();

  

  constructor(private serviciosService:ServiciosService) { }

  data!: Servicio[];

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.carga();
   
  }


  carga(){
    this.serviciosService.buscaServiciosOfrecidos().subscribe({
      next: (resp:any) => {
        console.log("ok");
        console.log(resp); 
        this.data=resp;
        console.log(this.data);
       
        this.dtTrigger.next(null);
      },
      error: (e) => {
        console.log(e);
        console.log("NO ok");
      }
    }
  )}


}

  

