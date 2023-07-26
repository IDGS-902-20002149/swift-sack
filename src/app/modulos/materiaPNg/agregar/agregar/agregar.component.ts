import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaPSS, ProveedorSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarMPComponent implements OnInit {
  dataSource: ProveedorSS[] = [];
  proveedores: ProveedorSS[] = []; // Ajusta el tipo de datos a ProveedorSS[]

  regMateriaPss: MateriaPSS = {
    id: 0,
    nombre: '',
    cantidad: 0,
    unidad_medida: '',
    costo: 0,
    idProveedor: 0,
    estatus: true
  };

  constructor(private materiapss: ProyectoApiService, private router: Router, private proveedoress: ProyectoApiService) { }

  agregar() {
    this.materiapss.agregarNuevaMateria(this.regMateriaPss).subscribe({
      next: () => {
        console.log('Materia prima agregada correctamente');
        // Realizar la redirección después de que se complete la solicitud
        this.router.navigate(['verMateriaPrima']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });

    this.regMateriaPss = {
      id: 0,
      nombre: '',
      cantidad: 0,
      unidad_medida: '',
      costo: 0,
      idProveedor: 0,
      estatus: true
    };
  }

  obtenerProveedores() {
    this.proveedoress.getProveedor().subscribe(
      {
        next: response => {
          this.dataSource = response;
          this.proveedores = response; // Asigna directamente la respuesta a proveedores
        },
        error: error => console.log(error)
      }
    );
  }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

}
