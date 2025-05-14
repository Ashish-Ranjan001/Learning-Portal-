import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmeServicesService {

  constructor(private http:HttpClient) { }
   private apiBaseUrl = 'https://localhost:7264'; 

}
