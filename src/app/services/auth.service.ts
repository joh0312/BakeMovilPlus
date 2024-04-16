import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  API_URL = 'http://127.0.0.1:5000/usuarios'; // Asegúrate de que esta es la URL correcta de tu API

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<ApiResponse>(`${this.API_URL}/login`, user);
  }
}
