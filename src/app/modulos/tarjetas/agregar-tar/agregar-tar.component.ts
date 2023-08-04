import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-tar',
  templateUrl: './agregar-tar.component.html',
  styleUrls: ['./agregar-tar.component.css']
})
export class AgregarTarComponent {
  tar: Tarjeta = {
    idTarjeta: 0,
    idUser: 1,
    numeroTarjeta: '',
    numTarEncryp: '',
    nombreTarjeta: '',
    mesVencimiento: '',
    annioVencimiento: '',
    ccv: '',
  };

  constructor(private tarjeta: ProyectoApiService, private router: Router) { }

  agregar() {
    this.tarjeta.addTarjeta(this.tar).subscribe({
      next: () => {
        console.log('Tarjeta agregada correctamente');
        this.router.navigate(['verTarjetas']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });
  }
}
