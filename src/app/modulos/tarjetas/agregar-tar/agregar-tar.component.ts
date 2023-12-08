import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import Swal from 'sweetalert2';

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

  usuario:UsuarioMod = {
    id: 0,
    name: '0',
    email: '0',
    password: '0',
    telefono: '0',
    active: false,
    confirmed_at: '0',
    roleId: 0,
  };

  constructor(private tarjeta: ProyectoApiService, private router: Router) { }

  agregar() {
    this.tar.idUser = this.usuario.id;
    console.log(this.tar);

    this.tarjeta.addTarjeta(this.tar).subscribe({
      next: () => {
        console.log('Tarjeta agregada correctamente');

        // SweetAlert para notificar que la tarjeta se agregó correctamente
        Swal.fire({
          icon: 'success',
          title: 'Tarjeta agregada',
          text: 'La tarjeta se ha agregado correctamente.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redireccionar después de cerrar SweetAlert
          this.router.navigate(['verTarjetas']);
        });
      },
      error: (e) => {
        console.error(e);

        // SweetAlert para mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar tarjeta',
          text: 'Hubo un problema al agregar la tarjeta. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      },
      complete: () => console.info('Solicitud completada')
    });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }
  }

  obtenerUsuario(){
    const userData = sessionStorage.getItem('userData');
    
    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log('Usuario: ' + this.usuario.name + ' recuperado');
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }
  }
}
