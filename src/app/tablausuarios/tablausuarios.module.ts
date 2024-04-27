import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TablausuariosPageRoutingModule } from './tablausuarios-routing.module';
import { TablausuariosPage } from './tablausuarios.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; // Importa NgxDatatableModule
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablausuariosPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule, 
  ],
  declarations: [TablausuariosPage]
})
export class TablausuariosPageModule {}
