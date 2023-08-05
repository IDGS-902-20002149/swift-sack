import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Direccion } from 'src/app/interfaces/direccion';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-dir',
  templateUrl: './agregar-dir.component.html',
  styleUrls: ['./agregar-dir.component.css']
})
export class AgregarDirComponent {

  dir: Direccion = {
    idDireccion: 0,
    idUser: 1,
    nombreCompleto: '',
    calleNumero: '',
    codigoPostal: '',
    telefono: ''
  };

  constructor(private direccion: ProyectoApiService, private router: Router) { }

  agregar() {
    this.direccion.addDireccion(this.dir).subscribe({
      next: () => {
        console.log('Direccion agregada correctamente');
        this.router.navigate(['verDirecciones']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });
  }
}
