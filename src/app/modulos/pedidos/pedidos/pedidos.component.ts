import { Component } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedido';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos:Pedido[] = [];

  constructor(public objApi:ProyectoApiService){}

  obtenerPedidos(){
    this.objApi.getPedidos().subscribe({
      next: response=>{
        this.pedidos=response;
      },
      error: error=>console.log(error)
    });
  }

  ngOnInit(): void {
    this.obtenerPedidos();
  }
}
