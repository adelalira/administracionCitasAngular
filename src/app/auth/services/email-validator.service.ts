import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AbstractControl, AsyncValidator, ValidationErrors, } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {

  private baseUrl: string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }



}
