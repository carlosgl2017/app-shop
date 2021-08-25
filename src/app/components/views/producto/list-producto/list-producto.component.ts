import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MensajeConfirmacionComponent } from "src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import { VerimagenComponent } from "../verimagen/verimagen.component";

@Component({
  selector: "app-list-producto",
  templateUrl: "./list-producto.component.html",
  styleUrls: ["./list-producto.component.css"],
})
export class ListProductoComponent implements OnInit {
  productos: Producto[];
  displayedColumns: string[] = [
    "prodid",
    "prodnombre",
    "prodprecioventa",
    "stock",
    "proddescrip",
    "categoria_id",
    "imagen",
    "acciones"
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: ProductoService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.findAll();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //para cargar datos
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.productos = respuesta;
      this.dataSource = new MatTableDataSource(this.productos); //this added, for table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: "350px",
      data: { mensaje: "Esta seguro que desea eliminar el producto" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.service.delete(index).subscribe(
          (respuesta) => {
            this.router.navigate(["productos"]);
            this.service.mensagem("producto eliminado con éxito!");
            this.findAll();
            this.snackBar.open("El producto fue eliminado con éxito", "", {
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
  navegarParaProductoCreate() {
    this.router.navigate(["productos/create"]);
  }

  /*------------Dialog modal---------------*/
 /*  openDialog(producto:Producto){
    const dialogRef = this.dialog.open(VerimagenComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   }  */  
   
   openDialog(producto:Producto){
    this.dialog.open(VerimagenComponent,{
      width:'400px',
      height:'450px',
      data:producto
    })
   } 
}
