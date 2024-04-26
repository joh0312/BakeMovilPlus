import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TablausuariosPageRoutingModule } from './tablausuarios-routing.module';
import { TablausuariosPage } from './tablausuarios.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; // Importa NgxDatatableModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablausuariosPageRoutingModule,
    NgxDatatableModule // Asegúrate de importar NgxDatatableModule aquí
  ],
  declarations: [TablausuariosPage]
})
export class TablausuariosPageModule {}
