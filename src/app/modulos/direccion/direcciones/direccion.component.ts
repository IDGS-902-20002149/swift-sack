import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/interfaces/direccion';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent {
  listFilter:string=''
  direcciones:any=[];

  constructor(public dir:ProyectoApiService){}

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

  eliminarDireccion(id:number){
    
      this.dir.eliminarDireccion(id).subscribe(
        () => {
          console.log('Direccion eliminada correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar direccion', error);
        }
      );
    
  }

  actualizarTabla(){
    this.dir.getDireccion(this.usuario.id).subscribe(
      {
        next: response=>{
      this.direcciones=response;
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
    this.actualizarTabla();
  }
}
