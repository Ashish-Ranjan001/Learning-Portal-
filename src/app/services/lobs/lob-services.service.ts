
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Lob {
  lobId: string;
  lobName: string;
  lobDescription: string;
  status: boolean;
}

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
  viewLobs(){
     const url = `${this.apiBaseUrl}/api/lobs`; 
    return this.http.get(url);
  }
  changeStatus(lobId: string) {
     const url = `${this.apiBaseUrl}/api/lobs`; 
     return this.http.put(url, lobId);
  }
  getLobById(lobId: string) {
    const url = `${this.apiBaseUrl}/api/lobs/${lobId}`; 
    return this.http.get<Lob>(url);
  }
  updateLob(lobId: string, lobData: any) {
    const url = `${this.apiBaseUrl}/api/lobs/${lobId}`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, lobData, { headers });
  }
}