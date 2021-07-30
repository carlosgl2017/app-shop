import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { ClienteService } from '../../cliente/cliente.service';
import { Compra } from '../../compra/compra';
import { Entrega } from '../../entrega/entrega';
import { Producto } from '../../producto/producto';
import { ProductoService } from '../../producto/producto.service';
import { Venta } from '../venta';
import { VentaService } from '../venta.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {
  titulo:string='Nueva Venta';
  venta:Venta=new Venta();

  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService:ClienteService,
    private activatedRoute:ActivatedRoute,
    private productoService:ProductoService,
    private ventaService:VentaService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let clienteId=+params.get('clienteId');
      this.clienteService.findById(clienteId).subscribe(cliente=>this.venta.cliente=cliente);
    })

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
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
      let nuevoItem = new Entrega();
      nuevoItem.producto = producto;
      this.venta.entregas.push(nuevoItem);
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

    this.venta.entregas = this.venta.entregas.map((item: Entrega) => {
      if (id === item.producto.prodid) {
        item.entcantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.venta.entregas.forEach((item: Entrega) => {
      if (id === item.producto.prodid) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.venta.entregas = this.venta.entregas.map((item: Entrega) => {
      if (id === item.producto.prodid) {
        ++item.entcantidad;
      }
      return item;
    });
  }

  eliminarItemVenta(id: number): void {
    this.venta.entregas = this.venta.entregas.filter((item: Entrega) => id !== item.producto.prodid);
  }

  create(facturaForm): void {
    console.log(this.venta);
    if (this.venta.entregas.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }

    if (facturaForm.form.valid && this.venta.entregas.length > 0) {
      this.ventaService.create(this.venta).subscribe(venta => {
        swal.fire(this.titulo, `Factura ${venta.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/ventas']);
      });
    }
  }


}
