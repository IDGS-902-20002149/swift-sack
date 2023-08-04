import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoSS  } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent implements OnInit{

  dataSource: ProductoSS[] = [];
  regProducto: ProductoSS = {
    id: 0,
    nombre: '',
    descripcion: '',
    costo: 0,
    foto: '',
    tipo_producto: '',
    receta: '',
    stock: 0
  };


  constructor(
    public productoss:ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  actualizarTabla(){
    this.productoss.getProducto().subscribe(
      {
        next: response=>{
      this.dataSource=response;
        },
        error: error=>console.log(error)
      }
    );
  }

  agregarStock(){
      const id = this.regProducto.id
      const stock = this.regProducto.stock
      this.productoss.agregarStock(stock, id).subscribe({
        next: response=>{
            response;
            console.log(response)
            this.router.navigate(['verProductos']);
            },
            error: error=>console.log(error)
      });

  }

  // agregarDetalle(){
  //   this.regDetalleProducto.id_producto = this.route.snapshot.params['id'];
  //   this.productoss.agregarDetalle(this.regDetalleProducto).subscribe({
  //     next: () => {
  //       console.log('Detalle agregado correctamente');
  //       this.router.navigate(['/verDetalle',  this.route.snapshot.params['id']]);
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => console.info('Solicitud completada')
  //   });

  //   this.regDetalleProducto = {
  //     id: 0,
  //   id_materia: 0,
  //   cantidad: 0,
  //   id_producto: 0
  //   };
  // }

  ngOnInit(): void {
    this.actualizarTabla();
  }

}

