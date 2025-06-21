import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../app/services/Tokenservice/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(state.url);
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(redirectUrl?: string): boolean {
    if (this.tokenService.isAuthenticated() && this.tokenService.isUserActive()) {
      return true;
    }

    // Store the attempted URL for redirecting after login
    // if (redirectUrl) {
    //   this.tokenService.setRedirectUrl(redirectUrl);
    // }

    this.router.navigate(['/login']);
    return false;
  }
}