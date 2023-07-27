import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarTarComponent } from 'src/app/modulos/tarjetas/agregar-tar/agregar-tar.component';
import { EditarTarComponent } from 'src/app/modulos/tarjetas/editar-tar/editar-tar.component';
import { TarjetasComponent } from 'src/app/modulos/tarjetas/tarjetas/tarjetas.component';

@NgModule({
  declarations: [
    AgregarTarComponent,
    EditarTarComponent,
    TarjetasComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AgregarTarComponent,
    EditarTarComponent,
    TarjetasComponent,
  ]
})
export class TarjetasMModule { }
