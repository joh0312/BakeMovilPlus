import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { MarcasFormPageRoutingModule } from './marcas-form-routing.module';
import { MarcasFormPage } from './marcas-form.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // Import ReactiveFormsModule here
    IonicModule,
    MarcasFormPageRoutingModule
  ],
  declarations: [MarcasFormPage]
})
export class MarcasFormPageModule {}
