import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAdquisicionComponent } from './components/views/adquisicion/add-edit-adquisicion/add-edit-adquisicion.component';
import { ListAdquisicionComponent } from './components/views/adquisicion/list-adquisicion/list-adquisicion.component';
import { AddEditCompraComponent } from './components/views/compra/add-edit-compra/add-edit-compra.component';
import { AddEditConceptoComponent } from './components/views/concepto/add-edit-concepto/add-edit-concepto.component';
import { ListConceptoComponent } from './components/views/concepto/list-concepto/list-concepto.component';
import { AddEditGrupoComponent } from './components/views/grupo/add-edit-grupo/add-edit-grupo.component';
import { ListGrupoComponent } from './components/views/grupo/list-grupo/list-grupo.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { DetalleComponent } from './components/views/producto/detalle/detalle.component';
import { AuthGuard } from './components/views/producto/guards/auth.guard';
import { RoleGuard } from './components/views/producto/guards/role.guard';
import { ProductoCreateComponent } from './components/views/producto/producto-create/producto-create.component';
import { ProductoDeleteComponent } from './components/views/producto/producto-delete/producto-delete.component';
import { ProductoReadComponent } from './components/views/producto/producto-read/producto-read.component';
import { ProductoUpdateComponent } from './components/views/producto/producto-update/producto-update.component';
import { AddEditProveedorComponent } from './components/views/proveedor/add-edit-proveedor/add-edit-proveedor.component';
import { ListProveedorComponent } from './components/views/proveedor/list-proveedor/list-proveedor.component';
import { ListReporteComponent } from './components/views/reporte/list-reporte/list-reporte.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  
  



   //adquisicion
   { path: 'adquisiciones', component: ListAdquisicionComponent },
   { path: 'adquisiciones/create', component: AddEditAdquisicionComponent },
   { path: 'adquisiciones/update/:adqid', component: AddEditAdquisicionComponent },

   //compra
   { path: 'compras', component: AddEditCompraComponent },
   
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'productos',
    component: ProductoReadComponent
  },
  {
    path: 'productos/delete/:prodid',
    component: ProductoDeleteComponent,canActivate:[AuthGuard,RoleGuard], data: {role:'ROLE_ADMIN'}
  },
  {
    path: 'productos/create',
    component: ProductoCreateComponent,canActivate:[AuthGuard,RoleGuard], data: {role:'ROLE_ADMIN'}
  },
  {
    path: 'productos/update/:prodid',
    component: ProductoUpdateComponent,canActivate:[AuthGuard,RoleGuard], data: {role:'ROLE_ADMIN'}
  },
  {
    path: 'productos/upload/:prodid',
    component: DetalleComponent
  },
  

  //adquisicion
  { path: 'proveedores', component: ListProveedorComponent },
  { path: 'proveedores/create', component: AddEditProveedorComponent },
  { path: 'proveedores/update/:provid', component: AddEditProveedorComponent },

   //grupos
   { path: 'grupos', component: ListGrupoComponent },
   { path: 'grupos/create', component: AddEditGrupoComponent },
   { path: 'grupos/update/:gruid', component: AddEditGrupoComponent},

    //concepto
    { path: 'conceptos', component: ListConceptoComponent },
    { path: 'conceptos/create', component: AddEditConceptoComponent },
    { path: 'conceptos/update/:conid', component: AddEditConceptoComponent},

    //reporte
    { path: 'reportes', component: ListReporteComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
