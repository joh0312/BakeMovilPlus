import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { marcasI } from 'src/app/models/marcas.interface';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5000'; // URL base de tu API

  constructor(private http: HttpClient) { }

  login(form: LoginI): Observable<ResponseI> {
    let direccion = `${this.apiUrl}/usuarios/login`; // Agregar la barra diagonal aquí
    return this.http.post<ResponseI>(direccion, form);
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  getAllMarcas(): Observable<marcasI[]> {
    const headers = this.createHeaders();
    const direccion = `${this.apiUrl}/marcas/getAll`;
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response: any) => response.success.data.map((marca: any) => ({
        id_marca: marca.id_marca.toString(),
        nombre_marca: marca.nombre_marca
      })))
    );
  }
}
