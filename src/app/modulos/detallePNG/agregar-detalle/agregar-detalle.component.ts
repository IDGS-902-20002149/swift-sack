import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MateriaPSS, DetalleProductoSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.css']
})
export class AgregarDetalleComponent implements OnInit{

  dataSource: MateriaPSS[] = [];
  regDetalleProducto: DetalleProductoSS = {
    id: 0,
    id_materia: 0,
    cantidad: 0,
    id_producto: 0
  };
  unidadMedidaSeleccionada: string | undefined;

  constructor(
    public materiaPss:ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  actualizarTabla(){
    this.materiaPss.getMateria().subscribe(
      {
        next: response=>{
      this.dataSource=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  agregarDetalle(){
    this.regDetalleProducto.id_producto = this.route.snapshot.params['id'];
    this.materiaPss.agregarDetalle(this.regDetalleProducto).subscribe({
      next: () => {
        console.log('Detalle agregado correctamente');
        this.router.navigate(['/verDetalle',  this.route.snapshot.params['id']]);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });

    this.regDetalleProducto = {
      id: 0,
    id_materia: 0,
    cantidad: 0,
    id_producto: 0
    };
  }

  obtenerUnidad(id: number): void {
    if (id > 0) {
      let materiaSeleccionada = null;

      for (const materia of this.dataSource) {
        if (materia.id == id) {

          materiaSeleccionada = materia;
          this.unidadMedidaSeleccionada = materia.unidad_medida;
          break;
        }
        console.log(materia.id)
      }
    } else {
      this.unidadMedidaSeleccionada = "undefined2";
    }
  }

  ngOnInit(): void {
    this.actualizarTabla();
  }

}
