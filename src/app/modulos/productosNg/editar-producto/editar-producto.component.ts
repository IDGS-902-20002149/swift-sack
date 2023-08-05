import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  dataSource:any=[];
  id:number = 0;
  regProducto: ProductoSS = {
    id:0,
    nombre:'',
    descripcion: '',
    costo:0,
    foto:'',
    tipo_producto:'',
    receta:'',
    stock: 0
  }

  constructor(
    private productoss: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerId();
  }

  obtenerId() {
    const idP = this.route.snapshot.params['id'];
    this.regProducto.id = Number(idP);
    this.id = Number(idP);
    console.log(this.id);

    this.productoss.obtenerProducto(this.id).subscribe({
      next: (response: ProductoSS[]) => {
        this.dataSource = response;
          this.regProducto.nombre = this.dataSource.nombre;
          this.regProducto.descripcion = this.dataSource.descripcion;
          this.regProducto.tipo_producto = this.dataSource.tipo_producto;
          this.regProducto.foto = this.dataSource.foto;
          this.regProducto.receta = this.dataSource.receta;
          this.regProducto.stock = this.dataSource.stock;
          this.regProducto.costo = this.dataSource.costo;
      },
      error: (error) => console.log(error)
    });
  }



  editar() {
    this.productoss.editarProducto(this.regProducto).subscribe(
      () => {
        console.log('Producto editado correctamente');
        this.router.navigate(['verProductos']);
      },
      error => {
        console.error('Error al editar el producto:', error);
      }
    );
  }

}
