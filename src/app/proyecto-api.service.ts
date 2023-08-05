import { ProductoMasVendido, ProductoMenosVendido, ValorCalculado, VentasMensuales } from './interfaces/finanzas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MateriaPSS, ProveedorSS } from './interfaces/swiftsack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Agrega esta importación
import { Usuario, UsuarioMod, UsuarioRegistro } from './interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService {

  private _proveedoresss:ProveedorSS[]=[
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

  private _materiaP:MateriaPSS[]=[
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


  constructor(private http:HttpClient) { }

  public register(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post<any>('https://localhost:7165/api/Auth/register', usuario);
  }
 
  public login(datos:Usuario): Observable<any> {
    return this.http.post<any>('https://localhost:7165/api/Auth/Login', datos);
  }

  public getProfile(id: number): Observable<UsuarioMod> {
    return this.http.get<UsuarioMod>(`https://localhost:7165/api/Auth/profile/${id}`);
  }

  public updateProfile(id: number, updatedUser: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7165/api/Auth/profile/${id}`, updatedUser);
  }

  private getRoleName(roleId: number): string {
    const roles = [
      { id: 1, name: 'admin', description: 'Administrador del sistema' },
      { id: 2, name: 'empleado', description: 'Empleado de la empresa' },
      { id: 3, name: 'cliente', description: 'Cliente' }
    ];

    const role = roles.find(r => r.id === roleId);
    return role ? role.description : '';
  }

  getUserProfile(id: number): Observable<UsuarioMod> {
    return this.getProfile(id).pipe(
      map((userProfile: UsuarioMod) => {
        return userProfile;
      })
    );
  }


  get provedor():ProveedorSS[]{
    return[...this._proveedoresss]
  }

  get materiap():MateriaPSS[]{
    return[...this._materiaP]
  }
   
  public getProveedor():Observable<ProveedorSS[]>{
    return this.http.get<ProveedorSS[]>('https://localhost:7165/api/ProveMater')
  }
   
  agregarNuevoProveedor(datos:ProveedorSS){
    return this.http.post('https://localhost:7165/api/ProveMater',datos)
  }
  editarProveedor(datos: ProveedorSS) {
    const url = `https://localhost:7165/api/ProveMater/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarProveedor(id:number) {
    const url = `https://localhost:7165/api/ProveMater?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerProveedor(id:number):Observable<ProveedorSS[]>{
    return this.http.get<ProveedorSS[]>(`https://localhost:7165/api/ProveMater/${id}`);
  }

  public getMateria():Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>('https://localhost:7165/api/MateriaP')
  }
   
  agregarNuevaMateria(datos:MateriaPSS){
    return this.http.post('https://localhost:7165/api/MateriaP',datos)
  }
  editarMateria(datos: MateriaPSS) {
    const url = `https://localhost:7165/api/MateriaP/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarMateria(id:number) {
    const url = `https://localhost:7165/api/MateriaP?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerMP(id:number):Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>(`https://localhost:7165/api/MateriaP/${id}`);
  }

  public getProductosMasVendidos(): Observable<ProductoMasVendido[]> {
    return this.http.get<ProductoMasVendido[]>('https://localhost:7160/api/Finanzas/MasVta');
  }

  public getProductosMenosVendidos(): Observable<ProductoMenosVendido[]> {
    return this.http.get<ProductoMenosVendido[]>('https://localhost:7160/api/Finanzas/MenosVta');
  }

  public getValoresCalculados(): Observable<ValorCalculado[]> {
    return this.http.get<ValorCalculado[]>('https://localhost:7160/api/Finanzas/Valores');
  }

  public getVentasMensuales(): Observable<VentasMensuales[]> {
    return this.http.get<VentasMensuales[]>('https://localhost:7160/api/Finanzas/VtaMes');
  }

}
