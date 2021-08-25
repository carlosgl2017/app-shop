import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableExporterModule} from 'mat-table-exporter';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatTooltipModule} from '@angular/material/tooltip';

import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
/* import { ProductoCreateComponent } from './components/views/producto/producto-create/producto-create.component';
import { ProductoDeleteComponent } from './components/views/producto/producto-delete/producto-delete.component';
import { ProductoReadComponent } from './components/views/producto/producto-read/producto-read.component';
import { ProductoUpdateComponent } from './components/views/producto/producto-update/producto-update.component';
 */
import { PedidoCreateComponent } from './components/views/pedido/pedido-create/pedido-create.component';
import { PedidoDeleteComponent } from './components/views/pedido/pedido-delete/pedido-delete.component';
import { PedidoReadComponent } from './components/views/pedido/pedido-read/pedido-read.component';
import { PedidoUpdateComponent } from './components/views/pedido/pedido-update/pedido-update.component';
/* import { DetalleComponent } from './components/views/producto/detalle/detalle.component'; */
//-------------pdf dependencies
// Import pdfmake-wrapper and the fonts to use
/* import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts); */
import { AddEditAdquisicionComponent } from './components/views/adquisicion/add-edit-adquisicion/add-edit-adquisicion.component';
import { ListAdquisicionComponent } from './components/views/adquisicion/list-adquisicion/list-adquisicion.component';
import { MensajeConfirmacionComponent } from './components/shared/mensaje-confirmacion/mensaje-confirmacion.component';

import { AddEditProveedorComponent } from './components/views/proveedor/add-edit-proveedor/add-edit-proveedor.component';
import { ListProveedorComponent } from './components/views/proveedor/list-proveedor/list-proveedor.component';
import { AddEditGrupoComponent } from './components/views/grupo/add-edit-grupo/add-edit-grupo.component';
import { ListGrupoComponent } from './components/views/grupo/list-grupo/list-grupo.component';
import { AddEditConceptoComponent } from './components/views/concepto/add-edit-concepto/add-edit-concepto.component';
import { ListConceptoComponent } from './components/views/concepto/list-concepto/list-concepto.component';
import { AddEditPruebareporteComponent } from './components/views/reporte/add-edit-pruebareporte/add-edit-pruebareporte.component';
import { ListReporteComponent } from './components/views/reporte/list-reporte/list-reporte.component';
import { AddEditClienteComponent } from './components/views/cliente/add-edit-cliente/add-edit-cliente.component';
import { ListClienteComponent } from './components/views/cliente/list-cliente/list-cliente.component';
import { AddEditCategoriaComponent } from './components/views/categoria/add-edit-categoria/add-edit-categoria.component';
import { ListCategoriaComponent } from './components/views/categoria/list-categoria/list-categoria.component';
import { AddEditProductoComponent } from './components/views/producto/add-edit-producto/add-edit-producto.component';
import { ListProductoComponent } from './components/views/producto/list-producto/list-producto.component'; // fonts provided for pdfmake


PdfMakeWrapper.setFonts(pdfFonts);
import { PdfMakeWrapper, Img, IImg, Stack, Txt, IStack, IText, Ul, ITable, Table, Canvas, Rect, Item } from 'pdfmake-wrapper';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//import { type } from 'os';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NumberSymbol } from '@angular/common';
//import { table } from 'console';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { DatePipe } from "@angular/common";
import { ReporteclienteComponent } from './components/views/cliente/reportecliente/reportecliente.component';
import { ReporteproductoComponent } from './components/views/producto/reporteproducto/reporteproducto.component';
import { AddEditUsuarioComponent } from './components/views/usuarios/add-edit-usuario/add-edit-usuario.component';
import { ListUsuarioComponent } from './components/views/usuarios/list-usuario/list-usuario.component';
//import { AddEditVentaComponent } from './components/views/venta/add-edit-venta/add-edit-venta.component';
import { ListVentaComponent } from './components/views/venta/list-venta/list-venta.component';

import { VentaListClienteComponent } from './components/views/venta/venta-list-cliente/venta-list-cliente.component';
import { VentaHomeComponent } from './components/views/venta/venta-home/venta-home.component';
import { VentaDetalleComponent } from './components/views/venta/venta-detalle/venta-detalle.component';
import { VentaCreateComponent } from './components/views/venta/venta-create/venta-create.component';
import { VentaClienteFiltroComponent } from './components/views/venta/venta-cliente-filtro/venta-cliente-filtro.component';
import { DetalleComponent } from './components/views/producto/detalle/detalle.component';
import { VerimagenComponent } from './components/views/producto/verimagen/verimagen.component';
import { AdquisicionCreateComponent } from './components/views/adquisicion/adquisicion-create/adquisicion-create.component';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
//-----------ends
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
/*     ProductoCreateComponent,
    ProductoDeleteComponent,
    ProductoReadComponent,
    ProductoUpdateComponent, */
    PedidoCreateComponent,
    PedidoDeleteComponent,
    PedidoReadComponent,
    PedidoUpdateComponent,
   /*  DetalleComponent, */
    AddEditAdquisicionComponent,
    ListAdquisicionComponent,
    MensajeConfirmacionComponent,
    /* AddEditCompraComponent, */
    AddEditProveedorComponent,
    ListProveedorComponent,
    AddEditGrupoComponent,
    ListGrupoComponent,
    AddEditConceptoComponent,
    ListConceptoComponent,
    AddEditPruebareporteComponent,
    ListReporteComponent,
    AddEditClienteComponent,
    ListClienteComponent,
    AddEditCategoriaComponent,
    ListCategoriaComponent,
    AddEditProductoComponent,
    ListProductoComponent,
    ReporteclienteComponent,
    ReporteproductoComponent,
    AddEditUsuarioComponent,
    ListUsuarioComponent,
    //AddEditVentaComponent,
    ListVentaComponent,
    VentaListClienteComponent,
    VentaHomeComponent,
    VentaDetalleComponent,
    VentaCreateComponent,
    VentaClienteFiltroComponent,
    DetalleComponent,
    VerimagenComponent,
    AdquisicionCreateComponent,
   /*  ListCompraComponent, */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatStepperModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatTooltipModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
