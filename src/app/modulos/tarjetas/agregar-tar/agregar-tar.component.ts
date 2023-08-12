import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { UsuarioMod } from 'src/app/interfaces/usuario';
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
    const userData = sessionStorage.getItem('userData');
    let usuario:UsuarioMod = {
      id: 0,
      name: '0',
      email: '0',
      password: '0',
      telefono: '0',
      active: false,
      confirmed_at: '0',
      roleId: 0,
    };

    if (userData) {
      usuario = JSON.parse(userData);
      console.log('Usuario: ' + usuario.name + ' recuperado');
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }

    this.tar.idUser = usuario.id;
    console.log(this.tar);

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
