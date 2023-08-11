import { ProductoMasVendido, ProductoMenosVendido, ValorCalculado, VentasMensuales } from './interfaces/finanzas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MateriaPSS, ProveedorSS, ProductoSS, DetalleProductoSS } from './interfaces/swiftsack';
import { Observable } from 'rxjs';
import { Direccion } from './interfaces/direccion';
import { Tarjeta } from './interfaces/tarjeta';

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

  _direccion:Direccion[]=[
    {
      idDireccion: 0, 
      idUser: 0, 
      nombreCompleto: '',
      calleNumero: '',
      codigoPostal: '',
      telefono: '',
    },
  ]

  constructor(private http:HttpClient) { }

  get provedor():ProveedorSS[]{
    return[...this._proveedoresss]
  }

  get materiap():MateriaPSS[]{
    return[...this._materiaP]
  }

  get direccion():Direccion[]{
    return[...this._direccion]
  }

  public getProveedor():Observable<ProveedorSS[]>{
    return this.http.get<ProveedorSS[]>('https://localhost:7267/api/ProveMater')
  }

  agregarNuevoProveedor(datos:ProveedorSS){
    return this.http.post('https://localhost:7267/api/ProveMater',datos)
  }
  editarProveedor(datos: ProveedorSS) {
    const url = `https://localhost:7267/api/ProveMater/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarProveedor(id:number) {
    const url = `https://localhost:7267/api/ProveMater?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerProveedor(id:number):Observable<ProveedorSS[]>{
    return this.http.get<ProveedorSS[]>(`https://localhost:7267/api/ProveMater/${id}`);
  }

  public getMateria():Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>('https://localhost:7267/api/MateriaP')
  }

  agregarNuevaMateria(datos:MateriaPSS){
    return this.http.post('https://localhost:7267/api/MateriaP',datos)
  }

  editarMateria(datos: MateriaPSS) {
    const url = `https://localhost:7267/api/MateriaP/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarMateria(id:number) {
    const url = `https://localhost:7267/api/MateriaP?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerMP(id:number):Observable<MateriaPSS[]>{
    return this.http.get<MateriaPSS[]>(`https://localhost:7267/api/MateriaP/${id}`);
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

  public getProductosExistentes(): Observable<ProductoMenosVendido[]> {
    return this.http.get<ProductoMenosVendido[]>('https://localhost:7160/api/Finanzas/ProductosEx');
  }

  public getMateriaExistentes(): Observable<ValorCalculado[]> {
    return this.http.get<ValorCalculado[]>('https://localhost:7160/api/Finanzas/Materia');
  }

  public getTopClientes(): Observable<VentasMensuales[]> {
    return this.http.get<VentasMensuales[]>('https://localhost:7160/api/Finanzas/Top5Clientes');
  }




  public getProducto():Observable<ProductoSS[]>{
    return this.http.get<ProductoSS[]>('https://localhost:7165/api/Productos')
  }
  
  /* Links de Producto*/
  agregarProducto(datos:ProductoSS){
    return this.http.post('https://localhost:7165/api/Productos',datos)
  }

  editarProducto(datos: ProductoSS) {
    const url = `https://localhost:7165/api/Productos/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarProducto(id:number) {
    const url = `https://localhost:7165/api/Productos/${id}`;
    return this.http.delete(url);
  }

  obtenerProducto(id:number):Observable<ProductoSS[]>{
    return this.http.get<ProductoSS[]>(`https://localhost:7165/api/Productos/${id}`);
  }

  verDetalle(id:number):Observable<DetalleProductoSS[]>{
    return this.http.get<DetalleProductoSS[]>(`https://localhost:7165/api/DetalleProducto/${id}`);
  }

  agregarStock(stock: number, id:number) {
    const url = `https://localhost:7165/api/Productos/agregar-stock/${id}`;
    return this.http.put(url, stock);
  }

  agregarDetalle(datos:DetalleProductoSS){
    return this.http.post('https://localhost:7165/api/DetalleProducto',datos)
  }

  editarDetalle(datos: DetalleProductoSS) {
    const url = `https://localhost:7165/api/DetalleProducto/${datos.id}`;
    return this.http.put(url, datos);
  }

  eliminarDetalle(id:number) {
    const url = `https://localhost:7165/api/DetalleProducto/${id}`;
    return this.http.delete(url);
  }

  obtenerDetalle(id:number):Observable<DetalleProductoSS[]>{
    return this.http.get<DetalleProductoSS[]>(`https://localhost:7165/api/DetalleProducto/obtener-id/${id}`);
  }
  /* Links de Direccion */
  public getDireccion():Observable<Direccion[]>{
    return this.http.get<Direccion[]>('https://localhost:7267/api/Direccion')
  }
  
  addDireccion(datos:Direccion){
    return this.http.post('https://localhost:7267/api/Direccion',datos)
  }
  
  editarDireccion(datos: Direccion) {
    const url = `https://localhost:7267/api/Direccion/${datos.idDireccion}`;
    return this.http.put(url, datos);
  }

  eliminarDireccion(id:number) {
    const url = `https://localhost:7267/api/Direccion?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerDireccion(id:number):Observable<Direccion[]>{
    return this.http.get<Direccion[]>(`https://localhost:7267/api/Direccion/${id}`);
  }

  /* Links de Tarjetas */
  public getTarjeta():Observable<Tarjeta[]>{
    return this.http.get<Tarjeta[]>('https://localhost:7267/api/Tarjeta')
  }

  addTarjeta(datos:Tarjeta){
    return this.http.post('https://localhost:7267/api/Tarjeta',datos)
  }
  
  editarTarjeta(datos: Tarjeta) {
    const url = `https://localhost:7267/api/Tarjeta/${datos.idTarjeta}`;
    return this.http.put(url, datos);
  }

  eliminarTarjeta(id:number) {
    const url = `https://localhost:7267/api/Tarjeta?Id=${id}`;
    return this.http.delete(url);
  }

  obtenerTarjeta(id:number):Observable<Tarjeta[]>{
    return this.http.get<Tarjeta[]>(`https://localhost:7267/api/Tarjeta/${id}`);
  }

}
