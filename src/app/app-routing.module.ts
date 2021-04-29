import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { VentaCreateComponent } from './components/views/venta/venta-create/venta-create.component';
import { VentaDeleteComponent } from './components/views/venta/venta-delete/venta-delete.component';
import { VentaReadComponent } from './components/views/venta/venta-read/venta-read.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'ventas',
    component:VentaReadComponent
  },
  {
    path:'ventas/create',
    component:VentaCreateComponent
  },
  {
    path:'ventas/delete/:venid',
    component:VentaDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
