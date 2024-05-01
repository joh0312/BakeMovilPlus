import { Component, OnInit } from '@angular/core';
import { RolesI } from 'src/app/models/roles.interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {



  roles: RolesI[] = [];

  constructor(private api: AuthService) { }

  ngOnInit() {
    this.getRoles()
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


  
desactivarRol(rol:any) {
 
}

activarRol(rol:any){
 
}


}


