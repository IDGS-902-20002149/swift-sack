import { Injectable } from '@angular/core';
import { ProductoMasVendido, ProductoMenosVendido, ValorCalculado, VentasMensuales } from './interface/finanzas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoAPIService {

  constructor(private http:HttpClient) { }

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
