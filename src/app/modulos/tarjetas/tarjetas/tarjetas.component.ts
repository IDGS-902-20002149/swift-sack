import { Component } from '@angular/core';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {
  tarjetas:any=[];

  constructor(public tar:ProyectoApiService){}
 
  tarjetaObject:Tarjeta[]=[
    {
      idTarjeta: 1, 
      idUser: 1, 
      numeroTarjeta: "4152 3136 2121 0900",
      numTarEncryp: "**** **** **** 0900",
      nombreTarjeta: "LUIS GERMAN VARGAS",
      mesVencimiento: "12",
      annioVencimiento: "24",
      ccv:"123",
    },
  ]

  eliminarTarjeta(id:number){
    
      this.tar.eliminarTarjeta(id).subscribe(
        () => {
          console.log('Tarjeta eliminada correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar tarjeta', error);
        }
      );
    
  }

  actualizarTabla(){
    this.tar.getTarjeta().subscribe(
      {
        next: response=>{
      this.tarjetas=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.actualizarTabla();
  }
}
