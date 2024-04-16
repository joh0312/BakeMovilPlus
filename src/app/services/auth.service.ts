import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  usuario: string;
  contraseña: string;
}

interface ApiResponse {
  status: number;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5000/usuarios'; // URL base de tu API

  constructor(private http: HttpClient) { }

  login(user: User): Observable<string> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, user).pipe(map(response => response.data.token)); // Extraer el token de la respuesta
  }
}
