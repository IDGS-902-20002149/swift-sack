import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanzasComponent } from './finanzas/finanzas.component';

const routes: Routes = [
  {path: '',redirectTo: '/home', pathMatch:'full'},
  {path:'finanzas',component: FinanzasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
