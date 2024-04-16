import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ruta correcta al servicio
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  usuario: string  = '';
  contrasena: string  = ''; // Cambiado de 'contraseña' a 'contrasena'

  constructor(private authService: AuthService, private navCtrl: NavController) { // Asegúrate de que el nombre del servicio coincide con el importado

  }

  ngOnInit() {
  }

  onSubmit() {
    const user = {
      usuario: this.usuario,
      contraseña: this.contrasena // Cambiado de 'contraseña' a 'contrasena'
    };

    this.authService.login(user).subscribe(
      res => {
        console.log(res);
        this.navCtrl.navigateForward('/home');
      },
      err => {
        // Aquí manejas los errores de la API
        console.error(err);
      }
    );
  }
}
