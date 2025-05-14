import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmeServicesService {

  constructor(private http:HttpClient) { }
   private apiBaseUrl = 'https://localhost:7264';
   
   addSme(smeData: any) {
    const url = `${this.apiBaseUrl}/api/Smes`;
    return this.http.post(url, smeData);
   }
   viewSmes() {
    const url = `${this.apiBaseUrl}/api/smes`;
    return this.http.get(url);
   }

}
