import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/servicesToken/token.service'; // Corregir la importación del servicio

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {} // Corregir el nombre del servicio

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Verificar la autenticación del usuario utilizando el servicio tokenService
    if (this.tokenService.isAuthenticated()) {
      return true; // Permitir la navegación
    } else {
      // Redirigir al componente de login
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
    }
  }
}
