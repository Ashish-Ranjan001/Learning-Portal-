
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LobServicesService {

  private apiBaseUrl = 'https://localhost:7264'; 

  constructor(private http: HttpClient) { }

  

  addLob(lobData: any) {
    const url = `${this.apiBaseUrl}/api/lobs`; 
   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, lobData ,{headers});
  }
}