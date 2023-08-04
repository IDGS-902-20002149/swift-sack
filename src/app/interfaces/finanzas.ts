// Interfaz para los valores calculados
export interface ValorCalculado {
    gross_profit: number;
    average_purchase_value: number;
    total_users: number;
    new_users_weekly: number;
  }
  
  // Interfaz para los productos más vendidos
  export interface ProductoMasVendido {
    idProducto: number;
    nombre: string;
    cantidad: number;
    costo: number;
    total_obtenido: number;
  }
  
  // Interfaz para los productos menos vendidos
  export interface ProductoMenosVendido {
    idProducto: number;
    nombre: string;
    cantidad: number;
    costo: number;
    total_obtenido: number;
  }
  
  // Interfaz para las ventas mensuales
  export interface VentasMensuales {
    year:number;
    month: number;
    total_Sales: number;
  }
  