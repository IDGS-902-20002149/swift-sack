import { Component } from '@angular/core';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = { email: '', password: '' };

  constructor(
    private proyectoApiService: ProyectoApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.proyectoApiService.login(this.usuario).subscribe(
      (response) => {
        // Almacenar información del usuario en sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(response));
        console.log('Datos del usuario almacenados en sessionStorage:', response);

        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!',
        });

        // Redirigir al contenido del sistema
        this.router.navigate(['/home']);
        setTimeout(function() {
          window.location.reload();
        }, 2);
      },
      (error) => {
        console.error('Error de autenticación:', error);

        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
        });
      }
    );
  }
}
