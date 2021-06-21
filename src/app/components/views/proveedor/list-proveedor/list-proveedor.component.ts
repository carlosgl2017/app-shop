import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeConfirmacionComponent } from 'src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { Proveedor } from '../proveedor';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.css']
})
export class ListProveedorComponent implements OnInit {
  proveedores: Proveedor[];
  displayedColumns: string[] = [
    "provid",
    "provcinit",
    "provdepto",
    "provdirec",
    "provemail",
    "provempresa",
    "provfax",
    "provlugar",
    "provmaterno",
    "provnombre",
    "provpaterno",
    "provtelef",
    "provtipo",
    "provurl",
    "acciones",
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: ProveedorService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

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
      this.proveedores = respuesta;
      this.dataSource = new MatTableDataSource(this.proveedores); //this added, for table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: "350px",
      data: { mensaje: "Esta seguro que desea eliminar el proveedor" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.service.delete(index).subscribe(
          (respuesta) => {
            this.router.navigate(["proveedores"]);
            this.service.mensagem("proveedor  eliminado con éxito!");
            this.findAll();
            this.snackBar.open("El proveedor fue eliminado con éxito", "", {
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
  navegarParaProveedorCreate() {
    this.router.navigate(["proveedores/create"])
  }

}