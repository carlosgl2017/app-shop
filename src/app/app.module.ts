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

import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './components/views/home/home.component';
import { VentaReadComponent } from './components/views/venta/venta-read/venta-read.component';
import { VentaCreateComponent } from './components/views/venta/venta-create/venta-create.component';
import { VentaDeleteComponent } from './components/views/venta/venta-delete/venta-delete.component';
import { VentaUpdateComponent } from './components/views/venta/venta-update/venta-update.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { LoginComponent } from './components/views/login/login.component';
import { ProveedorCreateComponent } from './components/views/proveedor/proveedor-create/proveedor-create.component';
import { ProveedorDeleteComponent } from './components/views/proveedor/proveedor-delete/proveedor-delete.component';
import { ProveedorReadComponent } from './components/views/proveedor/proveedor-read/proveedor-read.component';
import { ProveedorUpdateComponent } from './components/views/proveedor/proveedor-update/proveedor-update.component';
import { AdquisicionCreateComponent } from './components/views/adquisicion/adquisicion-create/adquisicion-create.component';
import { AdquisicionDeleteComponent } from './components/views/adquisicion/adquisicion-delete/adquisicion-delete.component';
import { AdquisicionReadComponent } from './components/views/adquisicion/adquisicion-read/adquisicion-read.component';
import { AdquisicionUpdateComponent } from './components/views/adquisicion/adquisicion-update/adquisicion-update.component';
import { ComprasCreateComponent } from './components/views/compras/compras-create/compras-create.component';
import { ComprasDeleteComponent } from './components/views/compras/compras-delete/compras-delete.component';
import { ComprasReadComponent } from './components/views/compras/compras-read/compras-read.component';
import { ComprasUpdateComponent } from './components/views/compras/compras-update/compras-update.component';
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
import { GrupoCreateComponent } from './components/views/grupo/grupo-create/grupo-create.component';
import { GrupoDeleteComponent } from './components/views/grupo/grupo-delete/grupo-delete.component';
import { GrupoReadComponent } from './components/views/grupo/grupo-read/grupo-read.component';
import { GrupoUpdateComponent } from './components/views/grupo/grupo-update/grupo-update.component';
import { ConceptoCreateComponent } from './components/views/concepto/concepto-create/concepto-create.component';
import { ConceptoDeleteComponent } from './components/views/concepto/concepto-delete/concepto-delete.component';
import { ConceptoReadComponent } from './components/views/concepto/concepto-read/concepto-read.component';
import { ConceptoUpdateComponent } from './components/views/concepto/concepto-update/concepto-update.component';
import { DetalleComponent } from './components/views/producto/detalle/detalle.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    VentaReadComponent,
    VentaCreateComponent,
    VentaDeleteComponent,
    VentaUpdateComponent,
    CategoriaReadComponent,
    CategoriaCreateComponent,
    CategoriaDeleteComponent,
    CategoriaUpdateComponent,
    LoginComponent,
    ProveedorCreateComponent,
    ProveedorDeleteComponent,
    ProveedorReadComponent,
    ProveedorUpdateComponent,
    AdquisicionCreateComponent,
    AdquisicionDeleteComponent,
    AdquisicionReadComponent,
    AdquisicionUpdateComponent,
    ComprasCreateComponent,
    ComprasDeleteComponent,
    ComprasReadComponent,
    ComprasUpdateComponent,
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
    GrupoCreateComponent,
    GrupoDeleteComponent,
    GrupoReadComponent,
    GrupoUpdateComponent,
    ConceptoCreateComponent,
    ConceptoDeleteComponent,
    ConceptoReadComponent,
    ConceptoUpdateComponent,
    DetalleComponent
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
    MatTableExporterModule

    


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
