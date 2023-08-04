export interface ProveedorSS {
  id:number; 
  nombre:string; 
  empresa:string;
  rfc:string;
  telefono:string;
  email:string;
  estatus:boolean;
}

export interface MateriaPSS {
  id:number;
  nombre:string;
  cantidad:number;
  unidad_medida:string;
  costo:number;
  idProveedor:number;
  estatus:boolean;
}
