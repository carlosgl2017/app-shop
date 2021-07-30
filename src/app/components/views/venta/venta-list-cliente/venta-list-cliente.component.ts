import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Cliente } from "../../cliente/cliente";
import { ClienteService } from "../../cliente/cliente.service";
import { VentaClienteFiltroComponent } from "../venta-cliente-filtro/venta-cliente-filtro.component";

@Component({
  selector: "app-venta-list-cliente",
  templateUrl: "./venta-list-cliente.component.html",
  styleUrls: ["./venta-list-cliente.component.css"],
})
export class VentaListClienteComponent implements OnInit {
  clientes: Cliente[];
  displayedColumns: string[] = [
    "cliid",
    "nombre",
    "apellidos", 
    "numero_doc",
    "email",
    "acciones",
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: ClienteService,
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
      this.clientes = respuesta;
      this.dataSource = new MatTableDataSource(this.clientes); //this added, for table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  navegarParaVentaCreate() {
    this.router.navigate(["ventas/create"]);
  }
  

  /*------------Dialog modal---------------*/
  openDialog() {
    const dialogRef = this.dialog.open(VentaClienteFiltroComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
