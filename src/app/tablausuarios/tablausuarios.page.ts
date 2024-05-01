import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { RegistroI, UsuarioUpdateI } from 'src/app/models/registro.interface';
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
  nuevoForm: FormGroup;
  isModalOpen = false;
  usuarioSeleccionado: RegistroI | undefined;
  updateusuario: any;

 usuarios: RegistroI[] = [];
 tipoDocs: TipoDocI[] = [];
 roles: RolesI[] = [];
 nombreClicked: boolean = false;
 apellidoClicked: boolean = false;
 documentoClicked: boolean = false;
 telefonoClicked: boolean = false;
 passwordClicked: boolean = false;
 cPasswordClicked: boolean = false;
 emailClicked: boolean = false;
 tipoDocClicked: boolean = false;
 rolClicked: boolean = false;


  constructor(private fb: FormBuilder, private api: AuthService, private router: Router, private ngx: NgxDatatableModule) {
    this.nuevoForm = this.fb.group({
      id_usuario:['', Validators.required],
      id_tipo_documento: ['', Validators.required],
      id_rol: ['', Validators.required],
      nombre_usuario: ['', Validators.required],
      telefono_usuario: ['', Validators.required],
      password_usuario: ['', Validators.required],
      cPassword_usuario: ['', Validators.required],
      email_usuario: ['', [Validators.required, Validators.email]],
      doc_usuario: ['', Validators.required],
      apellido_usuario: ['', Validators.required],
    
    });
    

  }

  ngOnInit() {
    this.getUsuarios();
    this.getRoles()
    this.getTipoDoc()

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
  

  desactivarUsuario(usuario: RegistroI) {
    usuario.estado_rg=0
    this.api.deleteUsuario(usuario).subscribe(() => {
      console.log('Usuario Eliminado Correctamente');
      alert('Usuario desactivado Correctamente')
   
      this.getUsuarios()
    }, (error) => {
      console.error('Error al eliminar el usuario:', error);
      
     
    });

  }

  activarUsuario(usuario: RegistroI) {
    usuario.estado_rg=1
    this.api.deleteUsuario(usuario).subscribe(() => {
      console.log('Usuario Eliminado Correctamente');
      alert('Usuario activado Correctamente')
   
      this.getUsuarios()
    }, (error) => {
      console.error('Error al eliminar el usuario:', error);
      
     
    });

  }
  updateUsuario(form: UsuarioUpdateI) {
      // Asigna los datos del formulario al objeto updateUsuario

  this.updateusuario = {
    id_usuario: form.id_usuario,
    id_rol: form.id_rol,
    id_tipo_documento: form.id_tipo_documento,
    doc_usuario: form.doc_usuario,
    password_usuario: form.password_usuario,
    nombre_usuario: form.nombre_usuario,
    apellido_usuario: form.apellido_usuario,
    telefono_usuario: form.telefono_usuario,
    email_usuario: form.email_usuario,
  };
  console.log(this.updateusuario)
    this.api.updateUsuarios(this.updateusuario).subscribe(data => {
      console.log(data)
      if (data) {
        alert('Se ha actualizado correctamente')
      } else {
        alert('Intenta nuevamente')
      }
    })

  }

  setOpen(isOpen: boolean,usuario?: RegistroI) {
    this.isModalOpen = isOpen;
    if (usuario) {
      this.usuarioSeleccionado = usuario; // Asignar el usuario seleccionado
      this.patchForm(); // Cargar valores en el formulario
    }
  }
  close() {
    this.isModalOpen = false;
  }

  validateEmail() {
    const emailControl = this.nuevoForm.get('email_usuario');
    if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
      return 'El correo no es valido!';
    }
    return null; // El email es válido
  }
validateNombre() {
    if (!this.nombreClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const nombreControl = this.nuevoForm.get('nombre_usuario');
    if (nombreControl?.errors && nombreControl?.value.length == 0) {
      return 'El nombre es requerido.';
    } else if (nombreControl?.value.length < 4) {
      return 'Al menos 4 caracteres.';
    }
    return null; // No hay error
  }
  validateApellido() {
    if (!this.apellidoClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const apellidoControl = this.nuevoForm.get('apellido_usuario');
    if (apellidoControl?.errors  ) {
      return 'El apellido es requerido.';
    } else if (apellidoControl?.value.length < 4) {
      return 'Al menos 4 caracteres.';
    }
    return null; // No hay error
  }

  validatePassword() {
    if (!this.passwordClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const passControl = this.nuevoForm.get('password_usuario');
    if (passControl?.errors ) {
      return 'El contraseña es requerido.';
    } else if (passControl?.value.length <= 5) {
      return 'Al menos 6 caracteres.';
    }
    return null; // No hay error
  }
  validateCPassword() {
    if (!this.cPasswordClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const cPassControl = this.nuevoForm.get('cPassword_usuario');
    const passControl = this.nuevoForm.get('password_usuario');

    if (cPassControl?.errors ) {
      return 'El contraseña es requerido.';
    } else if (cPassControl?.value.length <= 5) {
      return 'Al menos 6 caracteres.';
    } else if (cPassControl?.value !== passControl?.value) {
      return 'la contraseña no coincide';
    }
    return null; // No hay error
  }

  validateDocument() {
    if (!this.documentoClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const docControl = this.nuevoForm.get('doc_usuario');
    if (docControl?.errors) {
      return 'El documento es requerido';
    } else if (docControl?.value.toString().length < 6) {
      return 'Al menos 6 numeros';
    }
    return null; // No hay error
  }
  validateTel() {
    if (!this.telefonoClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
      
    const telControl = this.nuevoForm.get('telefono_usuario');
    
    if(telControl?.value==null){
      return null
    }

    if (telControl?.errors && telControl?.value.toString().length == 0) {
      return 'El telefono es requerido';
    } else if (telControl?.value.toString().length < 10) {
      return 'Al menos 10 numeros';
    }
    return null; // No hay error
  }
  validaTipoDoc() {
    if (!this.tipoDocClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const tipoDocControl = this.nuevoForm.get('id_tipo_documento');
    if (tipoDocControl?.value == '') {
      return 'Tipo de documento requerido.';
    }
    return null; // No hay error
  }
  validaRol() {
    if (!this.rolClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const rolControl = this.nuevoForm.get('id_rol');
    if (rolControl?.value == '') {
      return 'Rol es requerido.';
    }
    return null; // No hay error
  }


  getRoles() {
    this.api.getAllRoles().subscribe({
      next: (data: RolesI[]) => {
        this.roles = data;
        if (Array.isArray(data)) {
          this.roles = data;
        } else {
          this.roles = [data];
        }
      },
      error: (error:any) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }

  getTipoDoc() {
    this.api.getAllTipoDoc().subscribe({
      next: (data: TipoDocI[]) => {
        this.tipoDocs = data;
        if (Array.isArray(data)) {
          this.tipoDocs = data;
        } else {
          this.tipoDocs = [data];
          console.log(this.tipoDocs)
        }
      },
      error: (error:any) => {
        console.error('Error al obtener roles:', error);
      }
    });
  }
  onNombreClicked() {
    this.nombreClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  onApellidoClicked() {
    this.apellidoClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  onDocClicked() {
    this.documentoClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  onTelClicked() {
    this.telefonoClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onPassClicked() {
    this.passwordClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onCPassClicked() {
    this.cPasswordClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onEmailClicked() {
    this.emailClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onTipoDocClicked() {
    this.tipoDocClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onRolClicked() {
    this.rolClicked = true; // Marcar como true cuando se hace clic en el campo
  }

  isFormValid(): boolean {
    return this.nuevoForm.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
  patchForm() {
    if (this.usuarioSeleccionado) {
      this.nuevoForm.patchValue({
        id_usuario: this.usuarioSeleccionado.id_usuario,
        nombre_usuario: this.usuarioSeleccionado.nombre_usuario,
        apellido_usuario: this.usuarioSeleccionado.apellido_usuario,
        telefono_usuario: this.usuarioSeleccionado.telefono_usuario,
        password_usuario: this.usuarioSeleccionado.password_usuario,
        email_usuario: this.usuarioSeleccionado.email_usuario,
        doc_usuario: this.usuarioSeleccionado.doc_usuario,
      });
    }
  }

}
