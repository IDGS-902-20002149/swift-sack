import { Component, OnInit } from '@angular/core';
import { MateriaPSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-materia-p',
  templateUrl: './materia-p.component.html',
  styleUrls: ['./materia-p.component.css']
})
export class MateriaPComponent implements OnInit {
  currentPage: number = 1
  pageSize: number = 10
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string=''
  alumnoTitle!:string
  dataSource:any=[];
  constructor(public materiaPss:ProyectoApiService){}

  showImage():void{
    this.muestraImg=!this.muestraImg;
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }

  proveedorIric:MateriaPSS[]=[
    {
      id:0,
      nombre:'',
      cantidad:0,
      unidad_medida:'',
      costo:0,
      idProveedor:0,
      estatus:true

    },

  ]

  eliminarMateria(id:number){

      this.materiaPss.eliminarMateria(id).subscribe(
        () => {
          console.log('Materia Prima eliminado correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar el materia prima:', error);
        }
      );

  }

  onCalificaClick(message:string){
    this.alumnoTitle=` ${message}`;

  }

  actualizarTabla(){
    this.materiaPss.getMateria().subscribe(
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
