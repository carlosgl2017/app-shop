import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeConfirmacionComponent } from 'src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {

  categorias: Categoria[];
  displayedColumns: string[] = [
  "catid",
  "nombre",
  "descripcion",
  "acciones",
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: CategoriaService,
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
      this.categorias = respuesta;
      this.dataSource = new MatTableDataSource(this.categorias); //this added, for table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: "350px",
      data: { mensaje: "Esta seguro que desea eliminar la categoria" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.service.delete(index).subscribe(
          (respuesta) => {
            this.router.navigate(["categorias"]);
            this.service.mensagem("categoria eliminada con éxito!");
            this.findAll();
            this.snackBar.open("La categoria fue eliminada con éxito", "", {
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
  navegarParaCategoriaCreate() {
    this.router.navigate(["categorias/create"])
  }

}
