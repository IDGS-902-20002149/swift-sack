import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaPSS, ProveedorSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarMPComponent implements OnInit {
  dataSource: ProveedorSS[] = [];
  proveedores: ProveedorSS[] = [];

  regMateriaPss: MateriaPSS = {
    id: 0,
    nombre: '',
    cantidad: 0,
    unidad_medida: '',
    costo: 0,
    idProveedor: 0,
    estatus: true
  };

  usuario: UsuarioMod = {
    id: 0,
    name: '0',
    email: '0',
    password: '0',
    telefono: '0',
    active: false,
    confirmed_at: '0',
    roleId: 0,
  };

  constructor(private materiapss: ProyectoApiService, private router: Router, private proveedoress: ProyectoApiService) { }

  agregar() {
    this.materiapss.agregarNuevaMateria(this.regMateriaPss).subscribe({
      next: () => {
        console.log('Materia prima agregada correctamente');
        Swal.fire({
          title: 'Éxito',
          text: 'Materia prima agregada correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['verMateriaPrima']);
        });
      },
      error: (e) => {
        console.error(e);
        Swal.fire({
          title: 'Error',
          text: 'Error al agregar materia prima. Consulte la consola para más detalles.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
      complete: () => {
        console.info('Solicitud completada');
        Swal.fire({
          title: 'Completado',
          text: 'Solicitud completada',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
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
    this.proveedoress.getProveedor().subscribe({
      next: response => {
        this.dataSource = response;
        this.proveedores = response;
      },
      error: error => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Error al obtener proveedores. Consulte la consola para más detalles.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  obtenerUsuario() {
    const userData = sessionStorage.getItem('userData');

    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log('Usuario: ' + this.usuario.name + ' recuperado');
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if (this.usuario.roleId != 1 && this.usuario.roleId != 2) {
      this.router.navigate(['/home']);
    }
    this.obtenerProveedores();
  }
}
