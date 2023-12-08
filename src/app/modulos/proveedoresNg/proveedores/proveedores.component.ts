import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Component, OnInit } from '@angular/core';
import { ProveedorSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  currentPage: number = 1
  pageSize: number = 10
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string=''
  alumnoTitle!:string
  dataSource:any=[];
  constructor(public proveedoress:ProyectoApiService, private router: Router){}
 
  showImage():void{
    this.muestraImg=!this.muestraImg;
  }
 
  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }

  proveedorIric:ProveedorSS[]=[
    {
      id:0,
    nombre:'',
    empresa:'',
    telefono:'',
    rfc:'',
    email:'',
    estatus:true
 
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

  eliminarProve(id: number) {
    this.proveedoress.eliminarProveedor(id).subscribe(
      () => {
        console.log('Proveedor eliminado correctamente');

        // SweetAlert para notificar que el proveedor se eliminó correctamente
        Swal.fire({
          icon: 'success',
          title: 'Proveedor eliminado',
          text: 'El proveedor se ha eliminado correctamente.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Actualizar la tabla después de cerrar SweetAlert
          this.actualizarTabla();
        });
      },
      error => {
        console.error('Error al eliminar el proveedor:', error);

        // SweetAlert para mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar proveedor',
          text: 'Hubo un problema al eliminar el proveedor. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
 
  onCalificaClick(message:string){
    this.alumnoTitle=` ${message}`;
 
  }

  actualizarTabla(){
    this.proveedoress.getProveedor().subscribe(
      {
        next: response=>{
      this.dataSource=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1){
      this.router.navigate(['/home']);
    }
    this.actualizarTabla();
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
}
