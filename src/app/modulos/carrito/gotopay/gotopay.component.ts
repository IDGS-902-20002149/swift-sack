import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-gotopay',
  templateUrl: './gotopay.component.html',
  styleUrls: ['./gotopay.component.css']
})
export class GotopayComponent {
  tarjetas:Tarjeta[]=[
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

  direcciones:any[]=[]

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, public objApi:ProyectoApiService){}

  getTarjetas(){
    this.objApi.getTarjeta().subscribe(
      {
        next: response=>{
      this.tarjetas=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  getDirecciones(){
    this.objApi.getDireccion().subscribe(
      {
        next: response=>{
      this.direcciones=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.getTarjetas();
    this.getDirecciones();
  }

}
