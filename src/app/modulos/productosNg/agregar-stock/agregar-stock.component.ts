import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoSS  } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-stock',
  templateUrl: './agregar-stock.component.html',
  styleUrls: ['./agregar-stock.component.css']
})
export class AgregarStockComponent implements OnInit{

  dataSource: ProductoSS[] = [];
  regProducto: ProductoSS = {
    id: 0,
    nombre: '',
    descripcion: '',
    costo: 0,
    foto: '',
    tipo_producto: '',
    receta: '',
    stock: 0
  };

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
    public productoss:ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  actualizarTabla(){
    this.productoss.getProducto().subscribe(
      {
        next: response=>{
      this.dataSource=response;
        },
        error: error=>console.log(error)
      }
    );
  }

  agregarStock(){
      const id = this.regProducto.id
      const stock = this.regProducto.stock
      console.log(id,stock)
      this.productoss.agregarStock(stock, id).subscribe({
        next: response=>{
            response;
            console.log(response)
            this.router.navigate(['verProductos']);
            },
            error: error=>console.log(error)
      });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
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

