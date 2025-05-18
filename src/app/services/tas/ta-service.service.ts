import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaServiceService {
  private apiBaseUrl = 'https://localhost:7264';

  constructor(private http: HttpClient) {

  
    
  }
}
