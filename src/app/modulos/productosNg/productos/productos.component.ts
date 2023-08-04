import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Component, OnInit } from '@angular/core';
import { ProductoSS } from 'src/app/interfaces/swiftsack';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  currentPage: number = 1
  pageSize: number = 10
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string=''
  dataSource:any=[];

  constructor(public productos:ProyectoApiService){}

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }


  productoIric:ProductoSS []=[
    {
    id:0,
    nombre:'',
    descripcion:'',
    tipo_producto:'',
    costo:0,
    foto:'',
    stock:0,
    receta:''
    },

  ]

  eliminarProducto(id:number){

      this.productos.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar el producto:', error);
        }
      );

  }

  actualizarTabla(){
    this.productos.getProducto().subscribe(
      {
        next: response=>{
      this.dataSource=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.actualizarTabla();
}

}
