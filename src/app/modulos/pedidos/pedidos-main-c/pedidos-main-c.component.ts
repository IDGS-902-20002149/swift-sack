import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/pedido';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-main-c',
  templateUrl: './pedidos-main-c.component.html',
  styleUrls: ['./pedidos-main-c.component.css']
})
export class PedidosMainCComponent {
  pedidos:Pedido[] = [];

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

  constructor(public objApi:ProyectoApiService, private router:Router){}

  obtenerMisPedidos() {
    this.objApi.getMisPedidos(this.usuario.id).subscribe({
      next: (response) => {
        this.pedidos = response;
        // Muestra una alerta con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Pedidos obtenidos correctamente',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.log(error);
        // Muestra una alerta con SweetAlert en caso de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener tus pedidos',
          text: 'Hubo un problema al obtener tus pedidos. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      }
    });
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

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }	
    this.obtenerMisPedidos();
  }

}
