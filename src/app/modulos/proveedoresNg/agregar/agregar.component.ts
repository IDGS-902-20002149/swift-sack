import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  regProveedor: ProveedorSS = {
    id: 0,
    nombre: '',
    empresa: '',
    telefono: '',
    rfc: '',
    email: '',
    estatus: true
  }

  constructor(private proveedoresss: ProyectoApiService, private router: Router) { }

  agregar() {
    this.proveedoresss.agregarNuevoProveedor(this.regProveedor).subscribe({
      next: () => {
        console.log('Proveedor agregado correctamente');
        // Realizar la redirección después de que se complete la solicitud
        this.router.navigate(['verProveedores']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });

    this.regProveedor = {
      id: 0,
      nombre: '',
      empresa: '',
      telefono: '',
      rfc: '',
      email: '',
      estatus: true
    }
  }
}
