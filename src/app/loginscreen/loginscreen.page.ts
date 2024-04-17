import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { ResponseI } from '../models/response.interface'; // Importa ResponseI desde '../models/response.interface'
import { LoginI } from 'src/app/models/login.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  loginForm: FormGroup;
  usuarioClicked: boolean = false;
  passClicked: boolean = false;

  constructor(
    private authService: AuthService,

    private router: Router, // Inyecta Router en el constructor
    private fb: FormBuilder

  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    
  }

 /* checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home'])
    }
  }*/

  onLogin(form: LoginI) {
    // Crear un objeto User con el usuario y la contraseña
  
  
    // Llamar al método login con el objeto User
    this.authService.login(form).subscribe(
      (data: any) => {
        console.log(data);
        let dataResponse: ResponseI = data;
        if (dataResponse) {
          localStorage.setItem("token", dataResponse.token);
          localStorage.setItem("usuario", dataResponse.usuario);
          this.router.navigate(['/home']); // Usa Router para navegar a 'home'
          alert("Has ingresado correctamente");
          // Utiliza Swal si estás mostrando una alerta
          // Swal.fire({
          //   icon: "success",
          //   title: "Has ingresado",
          //   showConfirmButton: false,
          //   timer: 1000
          // });                  
  
        }
      },
      (err)  => {
        console.error(err);
        alert("Usuario o Contraseña incorrecta");
      }
    );
  }
  

  // Método para validar el email
  validateUsuario() {
    if (!this.usuarioClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const emailControl = this.loginForm.get('usuario');
    if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
      return 'El correo no es valido!';
    } else if (emailControl?.value.length <= 9) {
      return 'Al menos 6 caracteres.'
    }
    return null; // El email es válido
  }
  // Método para validar pass
  validatePass() {
    if (!this.passClicked) {
      return false; // No mostrar error si no se ha hecho clic en el campo de apellido
    }
    const passControl = this.loginForm.get('contraseña');
    if (passControl?.invalid && (passControl?.dirty || passControl?.touched)) {
      return 'contraseña no es valido!';
    } else if (passControl?.value.length <= 5) {
      return 'Al menos 4 caracteres.'
    }
    return null; // El email es válido
  }
  onUsuarioClicked() {
    this.usuarioClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  onPassClicked() {
    this.passClicked = true; // Marcar como true cuando se hace clic en el campo
  }
  isFormValid(): boolean {
    return this.loginForm.valid; // Retorna true si el formulario es válido, de lo contrario retorna false
  }
}




