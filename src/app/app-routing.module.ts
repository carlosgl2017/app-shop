import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAdquisicionComponent } from './components/views/adquisicion/add-edit-adquisicion/add-edit-adquisicion.component';
import { ListAdquisicionComponent } from './components/views/adquisicion/list-adquisicion/list-adquisicion.component';
/* import { AdquisicionCreateComponent } from './components/views/adquisicion/adquisicion-create/adquisicion-create.component';
import { AdquisicionDeleteComponent } from './components/views/adquisicion/adquisicion-delete/adquisicion-delete.component';
import { AdquisicionReadComponent } from './components/views/adquisicion/adquisicion-read/adquisicion-read.component';
import { AdquisicionUpdateComponent } from './components/views/adquisicion/adquisicion-update/adquisicion-update.component'; */
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { AddEditCompraComponent } from './components/views/compra/add-edit-compra/add-edit-compra.component';
import { ConceptoCreateComponent } from './components/views/concepto/concepto-create/concepto-create.component';
import { ConceptoDeleteComponent } from './components/views/concepto/concepto-delete/concepto-delete.component';
import { ConceptoReadComponent } from './components/views/concepto/concepto-read/concepto-read.component';
import { ConceptoUpdateComponent } from './components/views/concepto/concepto-update/concepto-update.component';
import { GrupoCreateComponent } from './components/views/grupo/grupo-create/grupo-create.component';
import { GrupoDeleteComponent } from './components/views/grupo/grupo-delete/grupo-delete.component';
import { GrupoReadComponent } from './components/views/grupo/grupo-read/grupo-read.component';
import { GrupoUpdateComponent } from './components/views/grupo/grupo-update/grupo-update.component';
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
/* import { ProveedorCreateComponent } from './components/views/proveedor/proveedor-create/proveedor-create.component';
import { ProveedorDeleteComponent } from './components/views/proveedor/proveedor-delete/proveedor-delete.component';
import { ProveedorReadComponent } from './components/views/proveedor/proveedor-read/proveedor-read.component';
import { ProveedorUpdateComponent } from './components/views/proveedor/proveedor-update/proveedor-update.component'; */
/* import { VentaCreateComponent } from './components/views/venta/venta-create/venta-create.component';
import { VentaDeleteComponent } from './components/views/venta/venta-delete/venta-delete.component';
import { VentaReadComponent } from './components/views/venta/venta-read/venta-read.component';
import { VentaUpdateComponent } from './components/views/venta/venta-update/venta-update.component'; */

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
   //gruposp
   { path: 'grupos', component: GrupoReadComponent },
   { path: 'grupos/create', component: GrupoCreateComponent },
   { path: 'grupos/delete/:gruid', component: GrupoDeleteComponent },
   { path: 'grupos/update/:gruid', component: GrupoUpdateComponent },
   ////////////////////////////////////////////////
   //concepto
   { path: 'conceptos', component: ConceptoReadComponent },
   { path: 'conceptos/create', component: ConceptoCreateComponent },
   { path: 'conceptos/delete/:conid', component: ConceptoDeleteComponent },
   { path: 'conceptos/update/:conid', component: ConceptoUpdateComponent },
   ////////////////////////////////////////////////



   //adquisicion
   { path: 'adquisiciones', component: ListAdquisicionComponent },
   { path: 'adquisiciones/create', component: AddEditAdquisicionComponent },
   { path: 'adquisiciones/update/:adqid', component: AddEditAdquisicionComponent },

   //compra
   { path: 'compras', component: AddEditCompraComponent },
   //Adquisicion
/*    { path: 'adquisiciones', component: AdquisicionReadComponent },
   { path: 'adquisiciones/create', component: AdquisicionCreateComponent },
   { path: 'adquisiciones/delete/:adqid', component: AdquisicionDeleteComponent },
   { path: 'adquisiciones/update/:adqid', component: AdquisicionUpdateComponent }, */
   ////////////////////////////////////////////////
 /*  {
    path: 'ventas',
    component: VentaReadComponent
  },
  {
    path: 'ventas/create',
    component: VentaCreateComponent
  },
  {
    path: 'ventas/delete/:venid',
    component: VentaDeleteComponent
  },
  {
    path: 'ventas/update/:venid',
    component: VentaUpdateComponent
  }, */
  {
    path: 'categorias',
    component: CategoriaReadComponent
  },
  {
    path: 'categorias/create',
    component: CategoriaCreateComponent
  },
  {
    path: 'categorias/delete/:catid',
    component: CategoriaDeleteComponent
  },
  {
    path: 'categorias/update/:catid',
    component: CategoriaUpdateComponent
  },
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

  /* { path: 'proveedor', component: ProveedorReadComponent },
  { path: 'proveedor/create', component: ProveedorCreateComponent },
  { path: 'proveedor/delete/:provid', component: ProveedorDeleteComponent },
  { path: 'proveedor/update/:provid', component: ProveedorUpdateComponent }, */

  //adquisicion
  { path: 'proveedores', component: ListProveedorComponent },
  { path: 'proveedores/create', component: AddEditProveedorComponent },
  { path: 'proveedores/update/:adqid', component: AddEditProveedorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
