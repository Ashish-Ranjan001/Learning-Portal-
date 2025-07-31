// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SmeServicesService {

//   constructor(private http:HttpClient) { }
//    private apiBaseUrl = 'https://localhost:7264';
   
//    addSme(smeData: any) {
//     const url = `${this.apiBaseUrl}/api/Smes`;
//     return this.http.post(url, smeData);
//    }
//    viewSmes() {
//     const url = `${this.apiBaseUrl}/api/smes`;
//     return this.http.get(url);
//    }

// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmeServicesService {
  private apiBaseUrl = 'https://localhost:7264';

  constructor(private http: HttpClient) {}

  
  getSmeById(smeId: string) {
    const url = `${this.apiBaseUrl}/api/smes/${smeId}`;
    return this.http.get<{ status: boolean }>(url);
  }

   updateSme(smeID: string, smeData: { status: boolean }) {
    const url = `${this.apiBaseUrl}/api/smes/${smeID}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, smeData, { headers });
  }
  // updateSme(smeId: string) {
  //   const url = `${this.apiBaseUrl}/api/smes/${smeId}`;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put(url, { headers });
  // }


  addSme(smeData: any) {
    const url = `${this.apiBaseUrl}/api/Smes`;
    return this.http.post(url, smeData);
   }
   viewSmes() {
    const url = `${this.apiBaseUrl}/api/smes`;
    return this.http.get(url);
   }
}
