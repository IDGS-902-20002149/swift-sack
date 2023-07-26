import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProveedoresComponent } from './modulos/proveedoresNg/proveedores/proveedores.component';
import { AgregarComponent } from './modulos/proveedoresNg/agregar/agregar.component'; 
import { EditarComponent } from './modulos/proveedoresNg/editar/editar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProveedoresFilterPipe } from './proveedores-filter.pipe';
import { MateriaPComponent } from './modulos/materiaPNg/materiaP/materia-p/materia-p.component';
import { MateriaPFilterPipe } from './materiaP-filter.pipe';
import { EditarMPComponent } from './modulos/materiaPNg/editar/editar/editar.component';
import { AgregarMPComponent } from './modulos/materiaPNg/agregar/agregar/agregar.component';

@NgModule({
  declarations: [
    AppComponent,
    FinanzasComponent,
    MenuComponent,
    ProveedoresComponent,
    AgregarComponent,
    EditarComponent,
    ProveedoresFilterPipe,
    MateriaPComponent,
    MateriaPFilterPipe,
    EditarMPComponent,
    AgregarMPComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
