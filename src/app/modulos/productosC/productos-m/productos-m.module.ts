import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosCComponent } from '../productosC/productosC.component';
import { DetalleClienteComponent } from '../detalle-cliente/detalle-cliente.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductosCComponent,
    DetalleClienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    ProductosCComponent,
    DetalleClienteComponent,
  ]
})
export class ProductosMModule { }
