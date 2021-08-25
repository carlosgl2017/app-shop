import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Compra } from "../../compra/compra";
import { Producto } from "../../producto/producto";
import { ProductoService } from "../../producto/producto.service";
import { ProveedorService } from "../../proveedor/proveedor.service";
import { Adquisicion } from "../adquisicion";
import { AdquisicionService } from "../adquisicion.service";
import swal from "sweetalert2";
import { Proveedor } from "../../proveedor/proveedor";
import { AuthService } from '../../usuarios/auth.service';

@Component({
  selector: "app-adquisicion-create",
  templateUrl: "./adquisicion-create.component.html",
  styleUrls: ["./adquisicion-create.component.css"],
})
export class AdquisicionCreateComponent implements OnInit {
  //get all proveedores
  proveedores: Proveedor[] = [];
  titulo: string = "Nueva Compra";
  adquisicion: Adquisicion = new Adquisicion();

  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private proveedorService: ProveedorService,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private authservice:AuthService,
    private adquisicionService: AdquisicionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //set user id
    /* this.adquisicion.usuario_id=this.authservice.usuario.id;   */   
  
    this.findAllProveedores();

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      map((value) => (typeof value === "string" ? value : value.nombre)),
      flatMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.productoService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.prodnombre : undefined;
  }
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.prodid)) {
      this.incrementaCantidad(producto.prodid);
    } else {
      let nuevoItem = new Compra();
      nuevoItem.producto = producto;
      this.adquisicion.compras.push(nuevoItem);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }


  /*-------*/
  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemVenta(id);
    }

    this.adquisicion.compras = this.adquisicion.compras.map((item: Compra) => {
      if (id === item.producto.prodid) {
        item.compcant = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.adquisicion.compras.forEach((item: Compra) => {
      if (id === item.producto.prodid) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.adquisicion.compras = this.adquisicion.compras.map((item: Compra) => {
      if (id === item.producto.prodid) {
        ++item.compcant;
      }
      return item;
    });
  }

  eliminarItemVenta(id: number): void {
    this.adquisicion.compras = this.adquisicion.compras.filter((item: Compra) => id !== item.producto.prodid);
  }

  create(facturaForm): void {
    console.log(this.adquisicion);
    if (this.adquisicion.compras.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }


    if (facturaForm.form.valid && this.adquisicion.compras.length > 0) {
      this.adquisicionService.create(this.adquisicion).subscribe(adquisicion => {
        swal.fire(this.titulo, `Factura ${adquisicion.adqdescrip} creada con éxito!`, 'success');
        this.router.navigate(['/adquisiciones']);
      });
    }
  }

  //get all proveedores
  findAllProveedores() {
    this.proveedorService.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.proveedores = respuesta;
    });
  }
  //get user system to logs
  getCurrentUserSystem(){

  }
}
