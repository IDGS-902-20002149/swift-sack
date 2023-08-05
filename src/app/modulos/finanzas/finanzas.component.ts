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
  //monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  name!:string;
  monthNames: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Representación numérica de los meses


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
        this.filtrarVentasPorMes(); // Filtrar las ventas por el mes seleccionado inicialmente
      },
      error => {
        console.log(error);
      }
    );
  }
  
  // Elimina la llamada a mostrarGraficaVentasMensuales() desde obtenerVentasMensuales()
  filteredSales!: any[]; 
  selectedMonth: number = 7;
  hayDatosDisponibles: boolean = true;
  
  filtrarVentasPorMes(): void {
    
    const selectedMonthIndex = this.selectedMonth - 1; // Restamos 1 para obtener el índice correcto en monthNames
    const selectedMonth = this.monthNames[selectedMonthIndex];
    this.filteredSales = this.ventasMensuales.filter(item => item.month === selectedMonth);
    console.log(this.selectedMonth);
    this.hayDatosDisponibles = this.filteredSales.length > 0;
    this.mostrarGraficaVentasMensuales();
  }
  
  mostrarGraficaVentasMensuales(): void {
    const salesData = this.filteredSales.map(item => {
      return {
        name: item.nombre,
        value: item.total_vendido
      };
    });

      this.single = salesData;
      const grayPalette = ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'];
  
      //this.colorScale = new ColorHelper(this.colorScheme, ScaleType.Linear, [0, salesData.length], [0.2, 6]);
      this.colorScheme.domain = grayPalette;
      //.map(color => this.colorScale.getColor(color));
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
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

 

  onSelect(event: any) {
    console.log(event);
  }


  
  }
  
  
