import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  userAvatar = '/assets/avatar.png';
  userId: string ="";
  lobid:string="";



  constructor() { 
    this.userId = this.getDecodedUserId();
    
  }

  getDecodedUserId() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage.");
        return null;
      }

      const decodedToken: any = jwtDecode(token);
      console.log("=== DECODED TOKEN ===", decodedToken);

      this.userName = decodedToken.Name || this.userName;
      this.userEmail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || this.userEmail;
      this.lobid = decodedToken.LobId || this.lobid;
      const gender = decodedToken.Gender;

      this.userAvatar = gender === 'Male' ? 'male.svg' : 'female.jpg';

      const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
      console.log("=== EXTRACTED USER ID ===", userId);
      return userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return "";
    }
  }
  getDecodedToken(){
      return{
        userId: this.userId,
        userName: this.userName,
        userEmail: this.userEmail,
        userAvatar: this.userAvatar,
        lobid: this.lobid
      }
    }
  }


