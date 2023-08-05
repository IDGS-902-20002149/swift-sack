import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent  {
  dataSource: ProductoSS[] = [];

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

  constructor(private productoss: ProyectoApiService,
    private router: Router
    ) { }

  agregar() {
    this.productoss.agregarProducto(this.regProducto).subscribe({
      next: () => {
        console.log('Producto agregada correctamente');
        // Realizar la redirección después de que se complete la solicitud
        this.router.navigate(['verProductos']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });

    this.regProducto = {
      id:0,
      nombre:'',
      descripcion: '',
      costo:0,
      foto:'',
      tipo_producto:'',
      receta:'',
      stock: 0
    };
  }


}
