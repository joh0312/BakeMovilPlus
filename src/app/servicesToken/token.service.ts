import { Injectable } from '@angular/core';
import { permisosI } from '../models/permisos.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'auth_token';

  constructor() { }

  // Guardar el token en el localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Eliminar el token del localStorage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    // Verifica si el token está presente y no ha expirado
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp * 1000);
      return expirationDate > new Date(); // Retorna true si el token no ha expirado
    }
    return false; // Retorna false si no hay token o ha expirado
  }
  getLoggedInUsername(): string | null {
    return localStorage.getItem('nombre_usuario');
  }
  getPermisosUsuario(): permisosI[] | null {
    const permisosJSON = localStorage.getItem('permisos_usuario');
    if (permisosJSON) {
      // Si hay datos, parsearlos de JSON a un array de permisos
      const permisos: permisosI[] = JSON.parse(permisosJSON);
      // Devolver el array de permisos
      return permisos;
    } else {
      // Si no hay datos, devolver null
      return null;
    }
  }
}
