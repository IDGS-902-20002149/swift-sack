import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Component, OnInit } from '@angular/core';
import { DetalleProductoSS, MateriaPSS, ProductoSS, DetalleCompleto} from 'src/app/interfaces/swiftsack';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  detalleCompletoList: DetalleCompleto[] = [];
  currentPage: number = 1
  pageSize: number = 10
  listFilter:string=''
  dataSource:any=[];
  dataSource1:any=[];
  id:number=0;

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.detalleCompletoList.slice(startIndex, endIndex);
  }

  eliminarProducto(id:number){

      this.detalless.eliminarDetalle(id).subscribe(
        () => {
          console.log('Detalle de producto eliminado correctamente');
          this.detalleCompletoList = [];
          this.verDetalle();
        },
        error => {
          console.error('Error al eliminar el deyalle del producto:', error);
        }
      );

  }
  constructor(
    private detalless: ProyectoApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.verDetalle();
  }

  verDetalle() {
    const idP = this.route.snapshot.params['id'];
    this.id = idP
    this.detalless.verDetalle(idP).subscribe({
      next: (response: DetalleProductoSS[]) => {
        this.dataSource = response;
        for (const detalle of this.dataSource) {
          const idM = detalle.id_materia
          this.detalless.obtenerMP(idM).subscribe({
            next: (response: MateriaPSS[]) => {
              this.dataSource1 = response;
              const detalleCompleto: DetalleCompleto = {
                id: detalle.id,
                materia: this.dataSource1,
                cantidad: detalle.cantidad,
                producto: detalle.id_producto
              };
              this.detalleCompletoList.push(detalleCompleto);
            },
            error: (error) => console.log(error)
          });
        }
      },
      error: (error) => console.log(error)
    });
  }
}




