import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosCComponent } from '../pedidos-c/pedidos-c.component';
import { PedidosComponent } from '../pedidos/pedidos.component';


@NgModule({
  declarations: [
    PedidosCComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PedidosCComponent,
    PedidosComponent
  ]
})
export class PedidosMModule { }
