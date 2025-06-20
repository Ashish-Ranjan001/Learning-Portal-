import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../services/Tokenservice/token.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    if (!this.tokenService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.tokenService.isSuperAdmin()) {
      return true;
    }

    // Redirect to home if not admin
    this.router.navigate(['/home']);
    return false;
  }
}
