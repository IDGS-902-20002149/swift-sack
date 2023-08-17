import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent  {
  dataSource: ProductoSS[] = [];

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

  regProducto: ProductoSS = {
    id:0,
    nombre:'',
    descripcion: '',
    costo:0,
    foto:'',
    tipo_producto:'',
    receta:'',
    stock: 0
  }

  constructor(private productoss: ProyectoApiService,
    private router: Router
    ) { }

  agregar() {
    this.productoss.agregarProducto(this.regProducto).subscribe({
      next: () => {
        console.log('Producto agregada correctamente');
        // Realizar la redirección después de que se complete la solicitud
        this.router.navigate(['verProductos']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });

    this.regProducto = {
      id:0,
      nombre:'',
      descripcion: '',
      costo:0,
      foto:'',
      tipo_producto:'',
      receta:'',
      stock: 0
    };
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
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
  }

}
