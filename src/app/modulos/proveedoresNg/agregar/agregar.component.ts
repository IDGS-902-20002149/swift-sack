import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import Swal from 'sweetalert2';

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

  constructor(private proveedoresss: ProyectoApiService, private router: Router) { }

  agregar() {
    this.proveedoresss.agregarNuevoProveedor(this.regProveedor).subscribe({
      next: () => {
        console.log('Proveedor agregado correctamente');

        // SweetAlert para notificar que el proveedor se agregó correctamente
        Swal.fire({
          icon: 'success',
          title: 'Proveedor agregado',
          text: 'El proveedor se ha agregado correctamente.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Realizar la redirección después de cerrar el SweetAlert
          this.router.navigate(['verProveedores']);
        });
      },
      error: (e) => {
        console.error(e);

        // SweetAlert para mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar proveedor',
          text: 'Hubo un problema al agregar el proveedor. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      },
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

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1){
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
