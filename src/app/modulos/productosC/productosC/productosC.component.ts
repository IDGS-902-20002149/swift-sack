import { Component } from '@angular/core';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productosC.component.html',
  styleUrls: ['./productosC.component.css']
})
export class ProductosCComponent {
  productos:ProductoSS[] = []

  constructor(public objApi:ProyectoApiService){}

  cargarProductos(){
    this.objApi.getProducto().subscribe(
      {
        next: response=>{
      this.productos=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.cargarProductos();
  }
}
