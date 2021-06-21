import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MensajeConfirmacionComponent } from "src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component";

import { Compra } from "../compra";
import { CompraService } from "../compra.service";

@Component({
  selector: "app-add-edit-compra",
  templateUrl: "./add-edit-compra.component.html",
  styleUrls: ["./add-edit-compra.component.css"],
})
export class AddEditCompraComponent implements OnInit {
  //para editar
  compid: any;
  accion = "Crear";
  //para editar
  compras: Compra[];
  displayedColumns: string[] = [
    "compid",
    "adqid",
    "compbonificacion",
    "compcant",
    "compcodctrl",
    "compconcepto",
    "acciones",
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  myForm: FormGroup;
  constructor(
    private service: CompraService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fb: FormBuilder
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
    });
  }

  ngOnInit(): void {
    this.findAll();
    if (this.compid!== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
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
      adqid: this.myForm.get('adqid').value,
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
      prodid: this.myForm.get('prodid').value
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
  });
  });
}

}
