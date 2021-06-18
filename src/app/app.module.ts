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
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { ProductoCreateComponent } from './components/views/producto/producto-create/producto-create.component';
import { ProductoDeleteComponent } from './components/views/producto/producto-delete/producto-delete.component';
import { ProductoReadComponent } from './components/views/producto/producto-read/producto-read.component';
import { ProductoUpdateComponent } from './components/views/producto/producto-update/producto-update.component';
import { PedidoCreateComponent } from './components/views/pedido/pedido-create/pedido-create.component';
import { PedidoDeleteComponent } from './components/views/pedido/pedido-delete/pedido-delete.component';
import { PedidoReadComponent } from './components/views/pedido/pedido-read/pedido-read.component';
import { PedidoUpdateComponent } from './components/views/pedido/pedido-update/pedido-update.component';
import { EntregaCreateComponent } from './components/views/entrega/entrega-create/entrega-create.component';
import { EntregaDeleteComponent } from './components/views/entrega/entrega-delete/entrega-delete.component';
import { EntregaReadComponent } from './components/views/entrega/entrega-read/entrega-read.component';
import { EntregaUpdateComponent } from './components/views/entrega/entrega-update/entrega-update.component';
import { DetalleComponent } from './components/views/producto/detalle/detalle.component';
//-------------pdf dependencies
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);
import { AddEditAdquisicionComponent } from './components/views/adquisicion/add-edit-adquisicion/add-edit-adquisicion.component';
import { ListAdquisicionComponent } from './components/views/adquisicion/list-adquisicion/list-adquisicion.component';
import { MensajeConfirmacionComponent } from './components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AddEditCompraComponent } from './components/views/compra/add-edit-compra/add-edit-compra.component';
import { AddEditProveedorComponent } from './components/views/proveedor/add-edit-proveedor/add-edit-proveedor.component';
import { ListProveedorComponent } from './components/views/proveedor/list-proveedor/list-proveedor.component';
import { AddEditGrupoComponent } from './components/views/grupo/add-edit-grupo/add-edit-grupo.component';
import { ListGrupoComponent } from './components/views/grupo/list-grupo/list-grupo.component';
import { AddEditConceptoComponent } from './components/views/concepto/add-edit-concepto/add-edit-concepto.component';
import { ListConceptoComponent } from './components/views/concepto/list-concepto/list-concepto.component';
import { AddEditPruebareporteComponent } from './components/views/reporte/add-edit-pruebareporte/add-edit-pruebareporte.component';
import { ListReporteComponent } from './components/views/reporte/list-reporte/list-reporte.component'; // fonts provided for pdfmake

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
    ProductoCreateComponent,
    ProductoDeleteComponent,
    ProductoReadComponent,
    ProductoUpdateComponent,
    PedidoCreateComponent,
    PedidoDeleteComponent,
    PedidoReadComponent,
    PedidoUpdateComponent,
    EntregaCreateComponent,
    EntregaDeleteComponent,
    EntregaReadComponent,
    EntregaUpdateComponent,
    DetalleComponent,
    AddEditAdquisicionComponent,
    ListAdquisicionComponent,
    MensajeConfirmacionComponent,
    AddEditCompraComponent,
    AddEditProveedorComponent,
    ListProveedorComponent,
    AddEditGrupoComponent,
    ListGrupoComponent,
    AddEditConceptoComponent,
    ListConceptoComponent,
    AddEditPruebareporteComponent,
    ListReporteComponent,
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
