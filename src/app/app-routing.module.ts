import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './modulos/proveedoresNg/agregar/agregar.component';
import { ProveedoresComponent } from './modulos/proveedoresNg/proveedores/proveedores.component';
import { EditarComponent } from './modulos/proveedoresNg/editar/editar.component';
import { MateriaPComponent } from './modulos/materiaPNg/materiaP/materia-p/materia-p.component';
import { EditarMPComponent } from './modulos/materiaPNg/editar/editar/editar.component';
import { AgregarMPComponent } from './modulos/materiaPNg/agregar/agregar/agregar.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch:'full'},
  {path:'Agregar', component: AgregarComponent},
  {path: 'verProveedores',component: ProveedoresComponent },
  {path: 'Editar/:id',component: EditarComponent },
  {path: 'verMateriaPrima',component: MateriaPComponent },
  {path: 'EditarMP/:id',component: EditarMPComponent },
  {path:'AgregarMP', component: AgregarMPComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
