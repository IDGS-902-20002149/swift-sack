import { Component } from '@angular/core';
import { MateriaPSS, ProveedorSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Compra, DetalleCompra } from 'src/app/interfaces/compra';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  dataSource:any = [];
  total:number= 0;
  idCompra:number = 0;
  tipoCompra:string="mayoreo";
  tipoConversion:string="";
  cantUnitMay:number=0;
  cantContenido:number=0;
  precioMay:number=0;

  proveedores: ProveedorSS[] = [];
  materias: MateriaPSS[] = [];
  setMaterias:DetalleCompra[] = [];
  compra:Compra = {
    idCompra:0,
    fecha: new Date (),
    iduser: 0,
    idProveedor: 0,
    folio: '',
    estatus: 1,
  };

  regMateriaPss: MateriaPSS = {
    id: 0,
    nombre: '',
    cantidad: 0,
    unidadMedida: '',
    costo: 0,
    idProveedor: 0,
    estatus: true
  };

  setMateria:DetalleCompra = {
    id: 0,
    idCompra:0,
    idProducto:0,
    cantidad:0,
    precio:0,
  }

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

  constructor(
    private materiapss: ProyectoApiService, 
    private proveedoress: ProyectoApiService,
    private router: Router) {
   }

  obtenerProveedores() {
    this.proveedoress.getProveedor().subscribe(
      {
        next: response => {
          this.proveedores = response; // Asigna directamente la respuesta a proveedores
        },
        error: error => console.log(error)
      }
    );
  }

  obtenerMateriaProveedor(idProveedor:number) {
    this.materiapss.getMateriaProveedor(idProveedor).subscribe(
      {
        next: response => {
          this.materias = response;
          
        },
        error: error => console.log(error)
      }
    );
  }

  obtenerMateria(idMateria: number) {
    const materiaEncontrada = this.materias.find(materia => materia.id === idMateria);
  
    if (materiaEncontrada) {
      this.regMateriaPss.nombre = materiaEncontrada.nombre;
       // Asignar la unidad de medida
      this.regMateriaPss.unidadMedida = materiaEncontrada.unidadMedida;
    console.log(this.regMateriaPss.unidadMedida);
      console.log(this.regMateriaPss.unidadMedida);
    } else {
      console.log(`No se encontr� una materia con id ${idMateria}`);
    }
  }
  
  ngOnInit(): void {

    this.obtenerProveedores();
  }

  setMateriaCompra() {
    if (this.tipoCompra === 'mayoreo') {
      // Realizar cálculos específicos para el tipo de compra "mayoreo"
      this.calcularCostoMayoreo();
    } else {
      // Realizar cálculos para otros tipos de compra
      const newRowData = {
        nombre: this.regMateriaPss.nombre,
        cantidad: this.setMateria.cantidad,
        unidadMedida: this.regMateriaPss.unidadMedida,
        precio: this.setMateria.precio,
        subtotal: this.setMateria.precio * this.setMateria.cantidad
      };
      this.dataSource.push(newRowData);
      // Calcular total para otros tipos de compra
      this.calcularTotal();
    }

    this.setMateria.idProducto = this.regMateriaPss.id;
    this.setMaterias.push(this.setMateria);
    console.log(this.setMaterias);
  }

  calcularCostoMayoreo() {
    if (this.cantUnitMay && this.cantContenido && this.precioMay) {
      const cantidadFinal = this.cantUnitMay * this.cantContenido;

      // Calcular el costo total
      const costoTotal = this.precioMay * this.cantUnitMay;

      // Calcular el costo por unidad (por metro)
      const costoPorUnidad =  costoTotal/cantidadFinal;

      const newRowData = {
        nombre: this.regMateriaPss.nombre,
        cantidad: cantidadFinal,
        unidadMedida: this.regMateriaPss.unidadMedida,
        precio: costoPorUnidad,
        subtotal: costoTotal,
       
      };

      this.dataSource.push(newRowData);
    }
  }

  calcularTotal(){
    for (let i = 0; i < this.dataSource.length; i++) {
      this.total =+ this.dataSource[i].subtotal;
    }
  }


  insertarCompra() {
    const uniqueFolio: string = uuidv4();
    console.log(this.regMateriaPss.unidadMedida);
    let compra: Compra = {
      idCompra: 0,
      fecha: new Date(),
      iduser: this.usuario.id,
      idProveedor: this.regMateriaPss.idProveedor,
      folio: uniqueFolio,
      estatus: 1,
    };
  
    this.materiapss.addCompra(compra).subscribe({
      next: (response) => {
        this.compra = response;
  
        Swal.fire({
          icon: 'success',
          title: 'Orden de compra agregada',
          text: 'La orden de compra se ha agregado correctamente.',
        });
  
        this.insertDetalle(this.compra.idCompra);
        console.log('Orden de compra agregada correctamente');
      },
      error: (e) => {
        console.error(e);
  
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar orden de compra',
          text: 'Hubo un problema al agregar la orden de compra. Inténtalo de nuevo.',
        });
      },
    });
  }
  

  insertDetalle(idCompra: number) {
    this.setMaterias.forEach((element) => {
      element.idCompra = idCompra;
      console.log(element);
      this.materiapss.addDetalleCompra(element).subscribe({
        next: () => {
          console.log('Detalle de compra agregado correctamente');
        },
        error: (e) => {
          console.error(e);
  
          // Mostrar SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar detalle de compra',
            text: 'Hubo un problema al agregar el detalle de compra. Inténtalo de nuevo.',
          });
        },
        complete: () => {
          // Mostrar SweetAlert de éxito al completar la solicitud
          Swal.fire({
            icon: 'success',
            title: 'Detalles de compra agregados',
            text: 'Los detalles de la compra se han agregado correctamente.',
          });
  
          // Redirigir después de completar la operación
          this.router.navigate(['verMateriaPrima']);
        },
      });
    });
    console.log('Detalles de compra agregados correctamente');
  }
  


}