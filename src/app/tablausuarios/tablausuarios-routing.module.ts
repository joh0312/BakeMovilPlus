import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablausuariosPage } from './tablausuarios.page';

const routes: Routes = [
  {
    path: '',
    component: TablausuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablausuariosPageRoutingModule {}
