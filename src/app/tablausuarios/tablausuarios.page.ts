import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/models/registro.interface';
import { RolesI } from 'src/app/models/roles.interfaces';
import { AuthService } from '../services/auth.service';
import { TipoDocI } from 'src/app/models/tipoDocument.interface';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-tablausuarios',
  templateUrl: './tablausuarios.page.html',
  styleUrls: ['./tablausuarios.page.scss'],
})
export class TablausuariosPage implements OnInit {

  
 usuarios: RegistroI[] = []; // Inicializa la propiedad 'columns' aquí
  columns = [
    
      { prop: 'id_usuario', name: 'id_usuario' },
      { prop: 'id_rol', name: 'id_rol' },
      { prop: 'id_tipo_documento', name: 'id_tipo_doc' },
      { prop: 'nombre_tipo_documento', name: 'nombre_tipo_doc' },
      { prop: 'doc_usuario', name: 'Documento' },
      { prop: 'nombre_usuario', name: 'Nombre' },
      { prop: 'apellido_usuario', name: 'Apellido' },
      { prop: 'telefono_usuario', name: 'Teléfono' },
      { prop: 'email_usuario', name: 'Correo' },
    
    
 // Puedes agregar más objetos aquí según necesites
  ];

  




  constructor(private fb: FormBuilder, private api: AuthService, private router: Router, private ngx: NgxDatatableModule) {



  }

  ngOnInit() {
    this.getUsuarios();

  }


  getUsuarios() {
    this.api.getAllUsuarios().subscribe(
      (data: RegistroI[]) => {
        console.log(data);
        this.usuarios = data; // Cambia 'usuario' por 'usuarios'
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  

  deleteUsuario(usuario: RegistroI) {
    this.api.deleteUsuario(usuario).subscribe(() => {
      console.log('Usuario Eliminado Correctamente');
      /*Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        showConfirmButton: false,
        timer: 1000
      });*/
      this.getUsuarios()
    }, (error) => {
      console.error('Error al eliminar el usuario:', error);
      /*Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR",
        footer: '<a href="">Intenta nuevamente</a>'
      });*/
    });

  }

  salir() {
    this.router.navigate(['home'])
  }

 /* getCurrentPageItems(): RegistroI[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.usuario.slice(startIndex, endIndex);
  }

  abrirModalParaEditarItem(usuario: RegistroI) {

  }*/








}
