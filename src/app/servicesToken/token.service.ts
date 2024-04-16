import { Injectable } from '@angular/core';

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
}
