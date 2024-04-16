import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSubmit() {
    // Crear un objeto User con el usuario y la contraseña
    const user = { usuario: this.usuario, contraseña: this.contrasena };

    // Llamar al método login con el objeto User
    this.authService.login(user).subscribe(
      (token: string) => {
        localStorage.setItem('token', token);
        this.navCtrl.navigateForward('/home');
      },
      err => {
        console.error(err);
      }
    );
  }
}
