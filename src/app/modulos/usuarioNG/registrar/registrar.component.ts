import { Component } from '@angular/core';
import { UsuarioMod, UsuarioRegistro } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  usuarioRegistro: UsuarioRegistro = {
    name: '',
    email: '',
    password: '',
    telefono: '',
    active: true,
    confirmed_at: new Date().toISOString() // Puedes ajustar esto según tus necesidades
  };

  constructor(private proyectoApiService: ProyectoApiService,
    private router: Router
    ) {}

  onSubmit() {
    this.proyectoApiService.register(this.usuarioRegistro).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        // Realizar acciones adicionales si es necesario, como redirigir a otra página
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }
}