import { Component } from '@angular/core';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productosC.component.html',
  styleUrls: ['./productosC.component.css']
})
export class ProductosCComponent {
  productos:ProductoSS[] = []
  currentPage: number = 1;
  pageSize: number = 9;
  listFilter:string='';
  selectedPriceRange: string = '';


  onPriceRangeChange() {
    if (this.selectedPriceRange != 'all') {
      this.currentPage = 1;
    }
  }


  constructor(public objApi:ProyectoApiService){}

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productos.slice(startIndex, endIndex);
  }

  cargarProductos(){
    this.objApi.getProducto().subscribe(
      {
        next: response=>{
      this.productos=response;
      for (const producto of this.productos) {
        if(producto.foto){
        producto.foto = `data:image/png;base64,${producto.foto}`;
        }
        else{
        producto.foto = '../../assets/img/desconocido.png';
        }
      }
    },
    error: error=>console.log(error)
  }
    );

  }

  ngOnInit(): void {
    this.cargarProductos();
  }
}
