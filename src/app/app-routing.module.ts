import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa el guard

const routes: Routes = [
  {
    path: 'loginscreen',
    loadChildren: () => import('./loginscreen/loginscreen.module').then( m => m.LoginscreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AuthGuard] // Protege esta ruta con el guard
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard] // Protege esta ruta con el guard
  },
  {
    path: 'tablausuarios',
    loadChildren: () => import('./tablausuarios/tablausuarios.module').then( m => m.TablausuariosPageModule),
    canActivate: [AuthGuard] // Protege esta ruta con el guard
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then( m => m.RolesPageModule),
    canActivate: [AuthGuard] // Protege esta ruta con el guard
  },
  // Define una ruta comodín que redirige a /home si no coincide con ninguna otra ruta
  { path: '**', redirectTo: 'home' } // Eliminé canActivate aquí
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
