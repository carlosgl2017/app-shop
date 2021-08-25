import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeConfirmacionComponent } from 'src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { Adquisicion } from '../adquisicion';
import { AdquisicionService } from '../adquisicion.service';

@Component({
  selector: 'app-list-adquisicion',
  templateUrl: './list-adquisicion.component.html',
  styleUrls: ['./list-adquisicion.component.css']
})
export class ListAdquisicionComponent implements OnInit {

  adquisiciones : Adquisicion[];
  displayedColumns: string[] = [
    "adqid",
    "created_at",
    "estado",
    "acciones"
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: AdquisicionService,
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
      this.adquisiciones = respuesta;
      this.dataSource = new MatTableDataSource(this.adquisiciones); //this added, for table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: "350px",
      data: { mensaje: "Esta seguro que desea eliminar el ingreso"},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.service.delete(index).subscribe(
          (respuesta) => {
            this.router.navigate(["adquisiciones"]);
            this.service.mensagem("adquisición eliminado con éxito!");
            this.findAll();
            this.snackBar.open("La adquisición fue eliminado con éxito", "", {
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
  navegarParaVentaCreate() {
    this.router.navigate(["adquisiciones/create"]);
  }

  

}
