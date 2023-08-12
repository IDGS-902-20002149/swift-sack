import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { UsuarioMod } from 'src/app/interfaces/usuario';
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
    this.objApi.getTarjeta(this.usuario.id).subscribe(
      {
        next: response=>{
      this.tarjetas=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  getDirecciones(){
    this.objApi.getDireccion(this.usuario.id).subscribe(
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
    this.getTarjetas();
    this.getDirecciones();
  }

}
