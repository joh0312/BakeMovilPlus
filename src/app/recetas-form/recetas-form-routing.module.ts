import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasFormPage } from './recetas-form.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasFormPageRoutingModule {}
