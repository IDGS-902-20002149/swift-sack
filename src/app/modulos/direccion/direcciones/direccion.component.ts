import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Direccion } from 'src/app/interfaces/direccion';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent {
  listFilter:string=''
  direcciones:Direccion[]=[];

  constructor(public dir:ProyectoApiService, private router: Router){}

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

  eliminarDireccion(id: number) {
    this.dir.eliminarDireccion(id).subscribe(
      () => {
        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Dirección eliminada correctamente',
          text: 'La dirección se ha eliminado correctamente.',
        });
  
        // Actualizar la tabla después de la eliminación
        this.actualizarTabla();
      },
      error => {
        console.error('Error al eliminar dirección', error);
  
        // Mostrar SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar dirección',
          text: 'Hubo un problema al eliminar la dirección. Inténtalo de nuevo.',
        });
      }
    );
  }
  

  actualizarTabla(){
    console.log(this.usuario.id)
    this.dir.getDireccion(this.usuario.id).subscribe(
      {
        next: response=>{
      this.direcciones=response;
      console.log(this.direcciones)
    },
    error: error=>console.log(error)
  }
    );
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
    this.actualizarTabla();
  }
}
