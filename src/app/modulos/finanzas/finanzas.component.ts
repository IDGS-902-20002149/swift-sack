import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from '../../proyecto-api.service';
import {  ColorHelper, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css'],
})
export class FinanzasComponent implements OnInit {
  productosMasVendidos!: any[];
  productosMenosVendidos!: any[];
  valoresCalculados!: any[];

  ventasMensuales!: any[];
  single: any[] = [];
  monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  

  constructor(private apiService: ProyectoApiService) { }

  ngOnInit(): void {
    this.obtenerProductosMasVendidos();
    this.obtenerProductosMenosVendidos();
    this.obtenerValoresCalculados();
    this.obtenerVentasMensuales();
  }

  obtenerProductosMasVendidos(): void {
    this.apiService.getProductosMasVendidos().subscribe(
      data => {
        this.productosMasVendidos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerProductosMenosVendidos(): void {
    this.apiService.getProductosMenosVendidos().subscribe(
      data => {
        this.productosMenosVendidos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerValoresCalculados(): void {
    this.apiService.getValoresCalculados().subscribe(
      data => {
        this.valoresCalculados = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  obtenerVentasMensuales(): void {
    this.apiService.getVentasMensuales().subscribe(
      data => {
        this.ventasMensuales = data;
        this.years = this.obtenerUniqueYears();
        this.selectedYear = this.years[0]; // Establecer el primer año como seleccionado inicialmente
        this.filtrarVentasPorAnio(this.selectedYear); // Filtrar las ventas por el año seleccionado
        this.mostrarGraficaVentasMensuales()
      },
      error => {
        console.log(error);
      }
    );
  }
  selectedYear!: number;
  filteredSales!: any[]; 
  years!: number[]; 


obtenerUniqueYears(): number[] {
  return Array.from(new Set(this.ventasMensuales.map(item => item.year)));
}

filtrarVentasPorAnio(year: number): void {
  this.filteredSales = this.ventasMensuales.filter(item => item.year === year);
}
  

mostrarGraficaVentasMensuales(): void {
  const salesData = this.filteredSales.map(item => {
    const monthName = this.monthNames[item.month - 1];
    return {
      name: monthName,
      value: item.total_Sales
    };
  });

  this.single = salesData;
  const grayPalette = ['#F0F0F0', '#D8D8D8', '#C0C0C0', '#A8A8A8', '#909090'];
  this.colorScale = new ColorHelper(this.colorScheme, ScaleType.Linear, [0, salesData.length], [0.2, 1]);
  this.colorScheme.domain = grayPalette.map(color => this.colorScale.getColor(color));
}

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mes';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas';
  colorScale!: ColorHelper;


 
  view: [number, number] = [800, 400];
  margin: any = { top: 20, right: 20, bottom: 50, left: 70 }; 

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

 

  onSelect(event: any) {
    console.log(event);
  }


  
  }
  
  

