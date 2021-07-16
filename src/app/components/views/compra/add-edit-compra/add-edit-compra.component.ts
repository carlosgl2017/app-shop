import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { MensajeConfirmacionComponent } from "src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component";
import { AdquisicionService } from "../../adquisicion/adquisicion.service";
import { Categoria } from "../../categoria/categoria";
import { Producto } from "../../producto/producto";
import { ProductoService } from "../../producto/producto.service";

import { Compra } from "../compra";
import { CompraService } from "../compra.service";

@Component({
  selector: "app-add-edit-compra",
  templateUrl: "./add-edit-compra.component.html",
  styleUrls: ["./add-edit-compra.component.css"],
})
export class AddEditCompraComponent implements OnInit {
  /*-------autocomplete---------*/
      autocompleteControl = new FormControl();
      productos: string[] = ['One', 'Two', 'Three'];
      productosFiltrados: Observable<Producto[]>;
  /*-----------*/
  //para editar
  compid: any;
  accion = "Crear";
  //para editar
  compras: Compra[];
  displayedColumns: string[] = [
    "compid",
    "adqid",
    "compimporte",
    "compcant",
    "compprecioventa",
    "compstockactual",
    "prodid",
    "acciones",
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  myForm: FormGroup;
  constructor(
    private service: CompraService,
    private serviceadquisicion:AdquisicionService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private serviceProducto:ProductoService

  ) {
    this.myForm = this.fb.group({
      compid: [""],
      adqid: [""],
      compbonificacion: [""],
      compcant: [""],
      compcodctrl: [""],
      compconcepto: [""],
      compdescuento: [""],
      compfecha: [""],
      compice: [""],
      compimporte: [""],
      complotestock: [""],
      compnrocajas: [""],
      comppeso: [""],
      comppesoneto: [""],
      comppreciosubtotal: [""],
      comppreciounitario: [""],
      compum_impuesto: [""],
      ctrllog: [""],
      prodid: [""],
      compfechavencimiento: [""],
      compfechaelaboracion: [""],
      compstockactual: [""],
      compprecioventa: [""],


    });
  }

  ngOnInit(): void {
    this.findAll();
    if (this.compid!== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }

    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      map(value=>typeof value === 'string'? value:value.nombre),
      flatMap(value => value ? this._filter(value):[])
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //para cargar datos
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.compras = respuesta;
      this.dataSource = new MatTableDataSource(this.compras); //this added, for table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: "350px",
      data: { mensaje: "Esta seguro que desea eliminar el item de compra?" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.service.delete(index).subscribe(
          (respuesta) => {
            this.findAll();
            this.service.mensagem("compra  eliminada con éxito!");       
            this.snackBar.open("Compra  fue eliminado con éxito", "", {
              duration: 3000,
            });
          },
          (err) => {
            this.service.mensagem(err.error.error);
          }
        );
      }
    });
  }

  navegarParaAdquisicionCreate() {
    this.router.navigate(["adquisiciones/create"]);
  }

  //method create
  create() {
    const compra: Compra = {
      compid: this.myForm.get('compid').value,
      adqid: this.serviceadquisicion.adqid,
      compbonificacion: this.myForm.get('compbonificacion').value,
      compcant: this.myForm.get('compcant').value,
      compcodctrl: this.myForm.get('compcodctrl').value,
      compconcepto: this.myForm.get('compconcepto').value,
      compdescuento: this.myForm.get('compdescuento').value,
      compfecha: this.myForm.get('compfecha').value,
      compice: this.myForm.get('compice').value,
      compimporte: this.myForm.get('compimporte').value,
      complotestock: this.myForm.get('complotestock').value,
      compnrocajas: this.myForm.get('compnrocajas').value,
      comppeso: this.myForm.get('comppeso').value,
      comppesoneto: this.myForm.get('comppesoneto').value,
      comppreciosubtotal: this.myForm.get('comppreciosubtotal').value,
      comppreciounitario: this.myForm.get('comppreciounitario').value,
      compum_impuesto: this.myForm.get('compum_impuesto').value,
      prodid: this.myForm.get('prodid').value,
      compprecioventa: this.myForm.get('compprecioventa').value,
      compstockactual: this.myForm.get('compstockactual').value,
      compfechaelaboracion: this.myForm.get('compfechaelaboracion').value,
      compfechavencimiento: this.myForm.get('compfechavencimiento').value
    };
    this.service.create(compra).subscribe((respuesta) => {
      this.findAll();
      this.service.mensagem('compra creada con éxito!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })

} 


update(compra:Compra): void {
  this.service.update(compra).subscribe((respuesta) => {
    this.findAll();
    this.service.mensagem("Compra actualizada con éxito");
  }, err => {
    this.service.mensagem('debe llenar todos los campos!')
  });
}

esEditar(): void {
  this.service.findById(this.compid).subscribe((respuesta) => {      
    this.myForm.patchValue({
    adqid: respuesta.adqid,
    compbonificacion: respuesta.compbonificacion,
    compcant: respuesta.compcant,
    compcodctrl: respuesta.compcodctrl,
    compconcepto: respuesta.compconcepto,
    compdescuento: respuesta.compdescuento,
    compfecha: respuesta.compfecha,
    compice: respuesta.compice,
    compimporte: respuesta.compimporte,
    complotestock: respuesta.complotestock,
    compnrocajas: respuesta.compnrocajas,
    comppeso: respuesta.comppeso,
    comppesoneto: respuesta.comppesoneto,
    comppreciosubtotal: respuesta.comppreciosubtotal,
    comppreciounitario: respuesta.comppreciounitario,
    compum_impuesto: respuesta.compum_impuesto,
    prodid: respuesta.prodid,    
    compprecioventa: respuesta.compprecioventa,    
    compstockactual: respuesta.compstockactual,    
    compfechaelaboracion: respuesta.compfechaelaboracion,    
    compfechavencimiento: respuesta.compfechavencimiento,    
  });
  });
}

/*--------------------------------*/
private _filter(value: string): Observable<Producto[]> {
  const filterValue = value.toLowerCase();
  return this.serviceProducto.filtrarProductos(filterValue);
}

mostrarNombre(producto?:Producto):string| undefined{
  return producto? producto.prodnombre: undefined;
}

}
