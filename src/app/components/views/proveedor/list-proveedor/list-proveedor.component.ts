import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MensajeConfirmacionComponent } from "src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component";
import { Proveedor } from "../proveedor";
import { ProveedorService } from "../proveedor.service";

import {
  Canvas,
  IImg,
  Img,
  IStack,
  ITable,
  PdfMakeWrapper,
  QR,
  Rect,
  Stack,
  Table,
  TextReference,
  Txt,
} from "pdfmake-wrapper";
import { DateAdapter } from "@angular/material/core"; //para las fechas
import { DatePipe } from "@angular/common";
type TableRow = [
  number,
  string,
  string,
  String,
  String,
  String,
  String,
  String,
  String,
  String,
  String,
  String,
  String,
  String
];

@Component({
  selector: "app-list-proveedor",
  templateUrl: "./list-proveedor.component.html",
  styleUrls: ["./list-proveedor.component.css"],
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
    public snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe
  ) {
    this.dateAdapter.setLocale("es-ES"); //idoma de los dias y meses del calendario
    dateAdapter.getFirstDayOfWeek = () => 1; //empieza en lunes el primer dia del calendario
  }

  date = new Date();

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
    this.router.navigate(["proveedores/create"]);
  }

  async generate() {
    const pdf = new PdfMakeWrapper();
    //const data = await this.fetchData();
    pdf.info({
      title: "Reporte de proveedores",
      author: "Consultor IDI",
      subject: "@mi.empresa.bo",
    });
    pdf.pageSize("LETTER");
    //pdf.pageOrientation("portrait");
    pdf.pageOrientation('landscape');
    //pdf.pageMargins([60, 60, 60, 40]);
    pdf.images({ Logo: await new Img("assets/img/bull.png").build() });
    const Logo: IImg = await new Img("Logo", true)
      .width(40)
      .height(50)
      .alignment("left")
      .margin([10, -20, 100, 0])
      .build();
    pdf.add(Logo);
    pdf.add("SORY MARTH");
    pdf.add(
      new Txt(
        "FECHA Y HORA: " +
          this.datePipe.transform(this.date, "dd/MM/yyyy HH:mm:ss")
      )
        .alignment("right")
        .margin([300, -10, -10, -10])
        .fontSize(8)
        .italics().end
    );
    pdf.add(
      new Txt("USUARIO: " + "Nelson Machaca")
        .alignment("right")
        .margin([300, -10, -15, -15])
        .fontSize(8)
        .italics().end
    );
    pdf.add(
      new Txt("LISTADO DE PROVEEDORES").alignment("center").fontSize(13).bold()
        .end
    );
    pdf.add("\n");
    pdf.add(this.creaTable(this.proveedores));
    pdf.add("\n");
    pdf.add(
      new QR(
        "USUARIO: " +
          "Nelson Machaca" +
          this.datePipe.transform(this.date, "dd/MM/yyyy HH:mm:ss")
      )
        .fit(90)
        .alignment("right").end
    );
    //pdf.add(new Canvas([new Rect([-10, 10], [450, 100]).end]).end);
    pdf.create().open();
  }
  creaTable(proveedores: Proveedor[]): ITable {
    [{}];
    return new Table([
      [
        "ID",
        "CI/NIT",
        "NOMBRE",
        "PATERNO",
        "MATERNO",
        "TIPO",
        "EMPRESA",
        "TELEFONO",
        "FAX",
        "URL",
        "EMAIL",
        "DEPTO.",
        "LUGAR",
        "DIRECCIÓN"
      ],
      ...this.extractData(proveedores),
    ])
      .fontSize(8)
      .alignment("center").end;
  }
  extractData(proveedores: Proveedor[]): TableRow[] {
    return proveedores.map((row) => [
      row.provid,
      row.provcinit,
      row.provnombre,
      row.provpaterno,
      row.provmaterno,
      row.provtipo,
      row.provempresa,
      row.provtelef,
      row.provfax,
      row.provurl,
      row.provemail,
      row.provdepto,
      row.provlugar,
      row.provdirec
    ]);
  }
  
}
