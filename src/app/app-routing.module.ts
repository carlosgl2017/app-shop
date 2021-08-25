import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAdquisicionComponent } from './components/views/adquisicion/add-edit-adquisicion/add-edit-adquisicion.component';
import { AdquisicionCreateComponent } from './components/views/adquisicion/adquisicion-create/adquisicion-create.component';
import { ListAdquisicionComponent } from './components/views/adquisicion/list-adquisicion/list-adquisicion.component';
import { AddEditCategoriaComponent } from './components/views/categoria/add-edit-categoria/add-edit-categoria.component';
import { ListCategoriaComponent } from './components/views/categoria/list-categoria/list-categoria.component';
import { AddEditClienteComponent } from './components/views/cliente/add-edit-cliente/add-edit-cliente.component';
import { ListClienteComponent } from './components/views/cliente/list-cliente/list-cliente.component';

import { ReporteclienteComponent } from './components/views/cliente/reportecliente/reportecliente.component';

import { AddEditConceptoComponent } from './components/views/concepto/add-edit-concepto/add-edit-concepto.component';
import { ListConceptoComponent } from './components/views/concepto/list-concepto/list-concepto.component';
import { AddEditGrupoComponent } from './components/views/grupo/add-edit-grupo/add-edit-grupo.component';
import { ListGrupoComponent } from './components/views/grupo/list-grupo/list-grupo.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { AddEditProductoComponent } from './components/views/producto/add-edit-producto/add-edit-producto.component';
import { DetalleComponent } from './components/views/producto/detalle/detalle.component';
/* import { DetalleComponent } from './components/views/producto/detalle/detalle.component';
import { AuthGuard } from './components/views/producto/guards/auth.guard';
import { RoleGuard } from './components/views/producto/guards/role.guard'; */
import { ListProductoComponent } from './components/views/producto/list-producto/list-producto.component';
import { ReporteproductoComponent } from './components/views/producto/reporteproducto/reporteproducto.component';
import { VerimagenComponent } from './components/views/producto/verimagen/verimagen.component';
/* import { ProductoCreateComponent } from './components/views/producto/producto-create/producto-create.component';
import { ProductoDeleteComponent } from './components/views/producto/producto-delete/producto-delete.component';
import { ProductoReadComponent } from './components/views/producto/producto-read/producto-read.component';
import { ProductoUpdateComponent } from './components/views/producto/producto-update/producto-update.component'; */
import { AddEditProveedorComponent } from './components/views/proveedor/add-edit-proveedor/add-edit-proveedor.component';
import { ListProveedorComponent } from './components/views/proveedor/list-proveedor/list-proveedor.component';
import { ListReporteComponent } from './components/views/reporte/list-reporte/list-reporte.component';
import { ListVentaComponent } from './components/views/venta/list-venta/list-venta.component';
import { VentaClienteFiltroComponent } from './components/views/venta/venta-cliente-filtro/venta-cliente-filtro.component';
import { VentaCreateComponent } from './components/views/venta/venta-create/venta-create.component';
import { VentaDetalleComponent } from './components/views/venta/venta-detalle/venta-detalle.component';
import { VentaHomeComponent } from './components/views/venta/venta-home/venta-home.component';
import { VentaListClienteComponent } from './components/views/venta/venta-list-cliente/venta-list-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

   //adquisicion
   { path: 'adquisiciones', component: ListAdquisicionComponent },
   { path: 'adquisiciones/create', component: AddEditAdquisicionComponent },
   { path: 'adquisiciones/update/:adqid', component: AddEditAdquisicionComponent },
   { path: 'adquisiciones/form', component: AdquisicionCreateComponent },


   //compra
   /* { path: 'compras', component: AddEditCompraComponent },
   { path: 'compras/create', component: AddEditCompraComponent },
   { path: 'adquisiciones/update/:compid', component: AddEditCompraComponent }, */

   //cliente
   { path: 'clientes', component: ListClienteComponent},
   { path: 'clientes/create', component: AddEditClienteComponent},
   { path: 'clientes/update/:cliid', component: AddEditClienteComponent },
   { path: 'clientes/reporte', component: ReporteclienteComponent },
   
   //ventas
   { path: 'ventas', component: VentaListClienteComponent},
   //{ path: 'ventas/lista-cliente', component: VentaListClienteComponent},
   { path: 'ventas/:id', component: VentaDetalleComponent},
   { path: 'ventas/realizadas/:id', component: VentaClienteFiltroComponent},
   { path: 'ventas/form/:clienteId', component: VentaCreateComponent},
   //entregas
 

  
  {
    path: 'login',
    component: LoginComponent
  },
/*   {
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
  }, */
  

  //proveedores
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

    //categoria
    { path: 'categorias', component: ListCategoriaComponent },
    { path: 'categorias/create', component: AddEditCategoriaComponent },
    { path: 'categorias/update/:catid', component: AddEditCategoriaComponent},

      //producto
      { path:  'productos/upload/:prodid', component: DetalleComponent},
      { path:  'productos/verfoto/:prodid', component: VerimagenComponent},
      { path: 'productos', component: ListProductoComponent },
      { path: 'productos/create', component: AddEditProductoComponent},
      { path: 'productos/update/:prodid', component: AddEditProductoComponent},
      { path: 'productos/reporte', component: ReporteproductoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
