import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarDirComponent } from 'src/app/modulos/direccion/agregar-dir/agregar-dir.component';
import { EditarDirComponent } from 'src/app/modulos/direccion/editar-dir/editar-dir.component';
import { DireccionComponent } from 'src/app/modulos/direccion/direcciones/direccion.component';

@NgModule({
  declarations: [
    AgregarDirComponent,
    EditarDirComponent,
    DireccionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgregarDirComponent,
    EditarDirComponent,
    DireccionComponent
  ]
})
export class DireccionMModule { }
