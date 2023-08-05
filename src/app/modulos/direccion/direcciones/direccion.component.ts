import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/interfaces/direccion';
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
 
  direccionObject:Direccion[]=[
    {
      idDireccion: 1, 
      idUser: 1, 
      nombreCompleto: 'Luis German',
      calleNumero: 'Tordo 148',
      codigoPostal: '37459',
      telefono: '4776741723',
    },
  ]

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
    this.dir.getDireccion().subscribe(
      {
        next: response=>{
      this.direcciones=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.actualizarTabla();
  }
}
