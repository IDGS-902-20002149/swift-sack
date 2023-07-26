import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Component, OnInit } from '@angular/core';
import { ProveedorSS } from 'src/app/interfaces/swiftsack';
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
  constructor(public proveedoress:ProyectoApiService){}
 
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

  eliminarProve(id:number){
    
      this.proveedoress.eliminarProveedor(id).subscribe(
        () => {
          console.log('Proveedor eliminado correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar el proveedor:', error);
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
    this.actualizarTabla();
}
}
