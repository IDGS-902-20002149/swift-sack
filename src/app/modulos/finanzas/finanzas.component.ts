import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from '../../proyecto-api.service';
import { ColorHelper, ScaleType } from '@swimlane/ngx-charts';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { formatDate } from '@angular/common';
import { ValorCalculado } from 'src/app/interfaces/finanzas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css'],
})
export class FinanzasComponent implements OnInit {
  productosMasVendidos!: any[];
  productosMenosVendidos!: any[];
  valoresCalculados!: any[];
  valoresCalculadosOriginales!: any[];
  productExis!: any[];
  materiaExist!: any[];
  topClientes!: any[];

  monthNames: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  selectedMonth: number = 7;
  mes:number = 0;

  ventasMensuales!: any[];
  single: any[] = [];
  //monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  name!: string;

  constructor(private apiService: ProyectoApiService) {}

  ngOnInit(): void {
    this.obtenerProductosMasVendidos();
    this.obtenerProductosMenosVendidos();
    this.obtenerValoresCalculados();
    this.obtenerVentasMensuales();
    this.obtenerTopClientes();
    this.obtenerProductoExistentes();
    this.obtenerMateriaExistentes();
  }

  filtar(): void {
    this.obtenerProductosMasVendidos();
    this.obtenerProductosMenosVendidos();
    this.obtenerValoresCalculados();
    this.obtenerProductoExistentes();
    this.obtenerMateriaExistentes();
    this.obtenerTopClientes();
    this.obtenerVentasMensuales();
  }

  obtenerProductosMasVendidos(): void {
    this.apiService.getProductosMasVendidos().subscribe(
      (data) => {
        this.productosMasVendidos = data;
        this.filtrarDatosPorMes();
  
        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Productos más vendidos obtenidos correctamente',
          text: 'Los datos de productos más vendidos se han cargado correctamente.',
        });
      },
      (error) => {
        console.log(error);
  
        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener productos más vendidos',
          text: 'Hubo un problema al obtener los datos de productos más vendidos. Inténtalo de nuevo.',
        });
      }
    );
  }
  

  obtenerProductosMenosVendidos(): void {
    this.apiService.getProductosMenosVendidos().subscribe(
      (data) => {
        this.productosMenosVendidos = data;
        this.filtrarDatosPorMes();
  
        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Productos menos vendidos obtenidos correctamente',
          text: 'Los datos de productos menos vendidos se han cargado correctamente.',
        });
      },
      (error) => {
        console.log(error);
  
        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener productos menos vendidos',
          text: 'Hubo un problema al obtener los datos de productos menos vendidos. Inténtalo de nuevo.',
        });
      }
    );
  }
  

  obtenerValoresCalculados(): void {
    this.apiService.getValoresCalculados().subscribe(
      (data) => {
        this.valoresCalculados = data;
        this.valoresCalculadosOriginales = data;
        this.filtrarDatosPorMes();
        
        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Datos de valores calculados obtenidos correctamente',
          text: 'Los datos de valores calculados se han cargado correctamente.',
        });
      },
      (error) => {
        console.log(error);
  
        // Mostrar SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener datos de valores calculados',
          text: 'Hubo un problema al obtener los datos de valores calculados. Inténtalo de nuevo.',
        });
      }
    );
  }
  

  obtenerTopClientes(): void {
    this.apiService.getTopClientes().subscribe(
      (data) => {
        this.topClientes = data;
        this.filtrarDatosPorMes();
  
        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Top clientes obtenido correctamente',
          text: 'Los datos del top de clientes se han cargado correctamente.',
        });
      },
      (error) => {
        console.log(error);
  
        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener top clientes',
          text: 'Hubo un problema al obtener los datos del top de clientes. Inténtalo de nuevo.',
        });
      }
    );
  }
  
  obtenerMateriaExistentes(): void {
    this.apiService.getMateriaExistentes().subscribe(
      (data) => {
        this.materiaExist = data;
        this.filtrarDatosPorMes();
  
        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Materias existentes obtenidas correctamente',
          text: 'Los datos de materias existentes se han cargado correctamente.',
        });
      },
      (error) => {
        console.log(error);
  
        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener materias existentes',
          text: 'Hubo un problema al obtener los datos de materias existentes. Inténtalo de nuevo.',
        });
      }
    );
  }
  
  obtenerProductoExistentes(): void {
    this.apiService.getProductosExistentes().subscribe(
      (data) => {
        this.productExis = data;
        this.filtrarDatosPorMes();
  
        // SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Productos existentes obtenidos correctamente',
          text: 'Los datos de productos existentes se han cargado correctamente.',
        });
      },
      (error) => {
        console.log(error);
  
        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener productos existentes',
          text: 'Hubo un problema al obtener los datos de productos existentes. Inténtalo de nuevo.',
        });
      }
    );
  }
  

  obtenerVentasMensuales(): void {
    this.apiService.getVentasMensuales().subscribe(
      (data) => {
        this.ventasMensuales = data;
        this.filtrarDatosPorMes();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  noDataAvailable: boolean = true;

  filtrarDatosPorMes(): void {
    const selectedMonthIndex = this.selectedMonth - 1;

    if (
      selectedMonthIndex >= 0 &&
      selectedMonthIndex < this.monthNames.length
    ) {
      const selectedMonth = this.monthNames[selectedMonthIndex];
      this.mes = selectedMonth;

      this.valoresCalculados = this.valoresCalculados.filter((item) => {
        // Asegurarse de que item.fecha y selectedMonth sean n�meros antes de comparar
        if (
          typeof item.fecha === 'number' &&
          typeof selectedMonth === 'number'
        ) {
          return item.fecha === selectedMonth;
        }
        return false;
      });
      this.productosMasVendidos = this.productosMasVendidos.filter((item) => {
        // Asegurarse de que item.fecha y selectedMonth sean n�meros antes de comparar
        if (
          typeof item.fecha === 'number' &&
          typeof selectedMonth === 'number'
        ) {
          return item.fecha === selectedMonth;
        }
        return false;
      });
      this.productosMenosVendidos = this.productosMenosVendidos.filter(
        (item) => {
          // Asegurarse de que item.fecha y selectedMonth sean n�meros antes de comparar
          if (
            typeof item.fecha === 'number' &&
            typeof selectedMonth === 'number'
          ) {
            return item.fecha === selectedMonth;
          }
          return false;
        }
      );
      this.productExis = this.productExis.filter((item) => {
        // Asegurarse de que item.fecha y selectedMonth sean n�meros antes de comparar
        if (
          typeof item.fecha === 'number' &&
          typeof selectedMonth === 'number'
        ) {
          return item.fecha === selectedMonth;
        }
        return false;
      });
      this.materiaExist = this.materiaExist.filter((item) => {
        // Asegurarse de que item.fecha y selectedMonth sean n�meros antes de comparar
        if (
          typeof item.fecha === 'number' &&
          typeof selectedMonth === 'number'
        ) {
          return item.fecha === selectedMonth;
        }
        return false;
      });
      this.topClientes = this.topClientes.filter((item) => {
        // Asegurarse de que item.fecha y selectedMonth sean n�meros antes de comparar
        if (
          typeof item.fecha === 'number' &&
          typeof selectedMonth === 'number'
        ) {
          return item.fecha === selectedMonth;
        }
        return false;
      });

      this.topClientes.sort((a, b) => b.numPedidos - a.numPedidos);
      this.productosMasVendidos.sort((a, b) => b.cantidad - a.cantidad);
      this.productosMenosVendidos.sort((a, b) => b.cantidad - a.cantidad);
      this.productExis.sort((a, b) => b.stock - a.stock);
      this.materiaExist.sort((a, b) => b.cantidad - a.cantidad);

      const isDataAvailable =
        this.valoresCalculados.length > 0 ||
        this.productosMasVendidos.length > 0 ||
        this.productosMenosVendidos.length > 0 ||
        this.productExis.length > 0 ||
        this.materiaExist.length > 0 ||
        this.topClientes.length > 0;

      this.noDataAvailable = !isDataAvailable;

      this.ventasMensuales = this.ventasMensuales.filter(
        (item) => item.month === selectedMonth
      );
      this.ventasMensuales.sort((a, b) => b.total_vendido - a.total_vendido);
      console.log(this.ventasMensuales);
      console.log(this.selectedMonth);
      this.mostrarGraficaVentasMensuales();
    } else {
      console.log('�ndice de mes seleccionado inv�lido.');
    }
  }

  mostrarGraficaVentasMensuales(): void {
    const salesData = this.ventasMensuales.map((item) => {
      return {
        name: item.nombre,
        value: item.total_vendido,
      };
    });

    this.single = salesData;
    const grayPalette = [
      '#5AA454',
      '#E44D25',
      '#CFC0BB',
      '#7aa3e5',
      '#a8385d',
      '#aae3f5',
    ];

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
  margin: any = { top: 20, right: 0, bottom: 50, left: 0 };

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  onSelect(event: any) {
    console.log('Selected month changed:');
    this.obtenerValoresCalculados();
  }
}
