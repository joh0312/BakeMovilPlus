import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { marcasI } from 'src/app/models/marcas.interface';
import { LoginI } from '../models/login.interface';
import { ResponseI } from '../models/response.interface';
import { RegistroI } from '../models/registro.interface';
import { RolesI } from '../models/roles.interfaces';
import { TipoDocI } from '../models/tipoDocument.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5000/'; // URL base de tu API

  constructor(private http: HttpClient) { }

  login(form: LoginI): Observable<ResponseI> {
    let direccion = `${this.apiUrl}usuarios/login`; // Agregar la barra diagonal aquí
    return this.http.post<ResponseI>(direccion, form).pipe(
      map((response: any) => ({
        token: response.success.data.token,
        nombre_usuario: response.success.data.nombre_usuario,
        usuario: response.success.data.usuario,
        permissions: response.success.data.permisos.map(
          (permissionArray: string[]) => ({
            name: permissionArray[0],
          })
        ),
      }))
    );
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

  getAllUsuarios(): Observable<RegistroI[]> {
    const headers = this.createHeaders();
    let direccion = `${this.apiUrl}/usuarios/getAll`; // Agregar la barra diagonal aquí
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((usuario: any) => ({
          id_usuario:usuario.id_usuario,
          id_rol : usuario.id_rol,
          id_tipo_documento: usuario.id_tipo_documento,
          tipo_documento: usuario.tipo_documento,
          doc_usuario:usuario.doc_usuario,
          password_usuario: usuario.password_usuario,
          nombre_usuario: usuario.nombre_usuario,
          apellido_usuario: usuario.apellido_usuario,
          telefono_usuario: usuario.telefono_usuario,
          email_usuario: usuario.email_usuario,
          nombre_tipo_documento:usuario.nombre_tipo_documento,
          nombre_rol:usuario.nombre_rol
        }))
      )
    );
  }

  insertUsuarios(usuario: RegistroI): Observable<RegistroI> {
    const headers = this.createHeaders();
    const direccion = this.apiUrl + 'usuarios/insert';
    return this.http.post<RegistroI>(direccion, usuario, { headers });
  }

  getAllRoles(): Observable<RolesI[]> {
    const headers = this.createHeaders();
    let direccion = this.apiUrl + 'roles/getAll';    
    return this.http.get<any>(direccion, { headers }).pipe(
      map((response) =>
        response.success.data.map((role: any) => ({
          id_rol:role.id_rol,
          nombre_rol:role.nombre_rol,
          estado_rg:role.estado_rg
        }))
      )
    );
  }

  getAllTipoDoc(): Observable<TipoDocI[]> {
    const headers = this.createHeaders();
    let direccion = this.apiUrl + 'tipos_documentos/getAll';
    return this.http.get<TipoDocI[]>(direccion, { headers });
  }

  deleteUsuario(usuario:RegistroI):Observable<any>{
    const headers=this.createHeaders();
    const direccion=`${this.apiUrl}usuarios/delete`;
    return this.http.delete<any>(direccion, { headers, body: usuario });
  }

 




}
















