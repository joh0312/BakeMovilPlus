import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasFormPageRoutingModule } from './recetas-form-routing.module';

import { RecetasFormPage } from './recetas-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasFormPageRoutingModule
  ],
  declarations: [RecetasFormPage]
})
export class RecetasFormPageModule {}
