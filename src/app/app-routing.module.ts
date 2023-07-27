import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinanzasComponent } from './modulos/finanzas/finanzas.component';

import { AgregarComponent } from './modulos/proveedoresNg/agregar/agregar.component';
import { ProveedoresComponent } from './modulos/proveedoresNg/proveedores/proveedores.component';
import { EditarComponent } from './modulos/proveedoresNg/editar/editar.component';
import { MateriaPComponent } from './modulos/materiaPNg/materiaP/materia-p/materia-p.component';
import { EditarMPComponent } from './modulos/materiaPNg/editar/editar/editar.component';
import { AgregarMPComponent } from './modulos/materiaPNg/agregar/agregar/agregar.component';

import { TarjetasComponent } from './modulos/tarjetas/tarjetas/tarjetas.component';
import { AgregarTarComponent } from './modulos/tarjetas/agregar-tar/agregar-tar.component';
import { EditarTarComponent } from './modulos/tarjetas/editar-tar/editar-tar.component';
import { DireccionComponent } from './modulos/direccion/direcciones/direccion.component';
import { AgregarDirComponent } from './modulos/direccion/agregar-dir/agregar-dir.component';
import { EditarDirComponent } from './modulos/direccion/editar-dir/editar-dir.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path:'finanzas',component: FinanzasComponent},
  {path:'Agregar', component: AgregarComponent},
  {path: 'verProveedores',component: ProveedoresComponent },
  {path: 'Editar/:id',component: EditarComponent },
  {path: 'verMateriaPrima',component: MateriaPComponent },
  {path: 'EditarMP/:id',component: EditarMPComponent },
  {path:'AgregarMP', component: AgregarMPComponent},
  {path: 'verTarjetas', component: TarjetasComponent},
  {path: 'AgregarTar', component: AgregarTarComponent},
  {path: 'EditarTar', component: EditarTarComponent},
  {path: 'verDirecciones', component: DireccionComponent},
  {path: 'AgregarDir', component: AgregarDirComponent},
  {path: 'EditarDir', component: EditarDirComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
