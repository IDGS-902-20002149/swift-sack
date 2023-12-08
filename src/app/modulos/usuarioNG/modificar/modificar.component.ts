import { Component, OnInit } from '@angular/core';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  userData: UsuarioMod | null = JSON.parse(sessionStorage.getItem('userData') ?? 'null');
  usuarioMod: UsuarioMod = {
    id: 0,
    name: '',
    email: '',
    password: '',
    telefono: '',
    active: false,
    confirmed_at: '',
    roleId: 0  }; // Inicializar como nulo
  
  constructor(
    private proyectoApiService: ProyectoApiService,
    private router: Router // Agrega esta línea
  ) {}

  ngOnInit(): void {
    if (this.userData) {
      this.proyectoApiService.getProfile(this.userData.id).subscribe(
        (userProfile: UsuarioMod) => {
          this.usuarioMod = userProfile; // Asignar el perfil obtenido
        },
        error => {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      );
    }
  }

  updateProfile() {
    console.log('Datos a actualizar:', this.usuarioMod);
    if (this.userData && this.usuarioMod) {
      this.proyectoApiService.updateProfile(this.userData.id, this.usuarioMod).subscribe(
        (response) => {
          console.log('Perfil actualizado exitosamente:', response);
          // Actualizar los datos en sessionStorage si es necesario
          sessionStorage.setItem('userData', JSON.stringify(this.usuarioMod));
          // Redirigir a la página de inicio o a donde sea necesario
          this.router.navigate(['/verProveedores']); // Cambia '/nueva-pagina' por la ruta que desees

          // SweetAlert para mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Perfil actualizado',
            text: 'Tu perfil se ha actualizado correctamente.',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);

          // SweetAlert para mostrar mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar perfil',
            text: 'Hubo un problema al actualizar tu perfil. Inténtalo de nuevo.',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
}
