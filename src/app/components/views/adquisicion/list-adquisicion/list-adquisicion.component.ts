import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Adquisicion } from "../adquisicion";
import { AdquisicionService } from "../adquisicion.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MensajeConfirmacionComponent } from "src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Canvas, IImg, Img, IStack, ITable, PdfMakeWrapper, QR, Rect, Stack, Table, TextReference, Txt } from "pdfmake-wrapper";


import { DateAdapter } from "@angular/material/core"; //para las fechas
import { DatePipe } from "@angular/common";





type TableRow = [number, Date, string, number, number, number, string];

@Component({
  selector: "app-list-adquisicion",
  templateUrl: "./list-adquisicion.component.html",
  styleUrls: ["./list-adquisicion.component.css"],
})
export class ListAdquisicionComponent implements OnInit {
  adquisiciones: Adquisicion[];
  displayedColumns: string[] = [
    "adqid",
    "adq_fec_fac_dui",
    "adq_nit_ci_prov",
    "adq_nro_fact",
    "adq_subtotal",
    "adq_total_importe_compra",
    "adqdescrip",
    "acciones",
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  date = new Date();

  constructor(
    private service: AdquisicionService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe
  ) {
    this.dateAdapter.setLocale('es-ES');//idoma de los dias y meses del calendario
    dateAdapter.getFirstDayOfWeek = () => 1; //empieza en lunes el primer dia del calendario
  }

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
      data: { mensaje: "Esta seguro que desea eliminar la adquisición" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.service.delete(index).subscribe(
          (respuesta) => {
            this.router.navigate(["adquisiciones"]);
            this.service.mensagem("adquisición  eliminada con éxito!");
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

  navegarParaAdquisicionCreate() {
    this.router.navigate(["adquisiciones/create"])
  }
  addcompras(adqid:number)
  {
   this.service.adqid=adqid;
   this.router.navigate(["compras/create"])
  }
  //----------------------------------------------------------
  async generate() {
    const pdf = new PdfMakeWrapper();
    const data = await this.fetchData();
    pdf.info({
      title: 'Reporte Adquisiciones',
      author: 'Consultor IDI',
      subject: '@mi.empresa.bo',
    });
    pdf.pageSize('LETTER');
    pdf.pageOrientation('portrait');
    //pdf.pageOrientation('landscape');
    //pdf.pageMargins([60, 60, 60, 40]);
    pdf.images({ Logo: await new Img('assets/img/bull.png').build() });
    const Logo: IImg = await new Img('Logo', true)
      .width(40)
      .height(50)
      .alignment('left')
      .margin([10, -20, 100, 0])
      .build();
    pdf.add(Logo);
    pdf.add('SORY MARTH');
    pdf.add(new Txt('FECHA Y HORA: ' + this.datePipe.transform(this.date, 'dd/MM/yyyy HH:mm:ss'))
      .alignment('right')
      .margin([300, -10, -10, -10])
      .fontSize(8)
      .italics()
      .end);
    pdf.add(new Txt('USUARIO: ' + 'Nelson Machaca')
      .alignment('right')
      .margin([300, -10, -15, -15])
      .fontSize(8)
      .italics()
      .end);
    pdf.add(new Txt('LISTADO DE ADQUISICIONES')
      .alignment('center')
      .fontSize(13)
      .bold()
      .end);
    pdf.add('\n');
    pdf.add(this.creaTable(this.adquisiciones));
    pdf.add('\n');
    pdf.add(new QR('USUARIO: ' + 'Nelson Machaca' + this.datePipe.transform(this.date, 'dd/MM/yyyy HH:mm:ss'))
      .fit(90)
      .alignment('right')
      .end);
    //pdf.add(new Canvas([new Rect([-10, 10], [450, 100]).end]).end);
    pdf.create().open();
  }
  creaTable(adquisiciones: Adquisicion[]): ITable {
    [{}]
    return new Table([
      ['ID', 'FECHA', 'NIT/CI', 'NRO. FACTURA', 'SUBTOTAL', 'TOTAL IMPORTE', 'DESCRIPCIÓN'],
      ...this.extractData(adquisiciones)
    ])
      .fontSize(10)
      .alignment("center")
      .end;
  }
  extractData(adquisiciones: Adquisicion[]): TableRow[] {
    return adquisiciones.map(row => [row.adqid,
    row.adqfecha,
    row.adq_nit_ci_prov,
    row.adq_nro_fact,
    row.adq_subtotal,
    row.adq_total_importe_compra,
    row.adqdescrip]);
  }
  async fetchData(): Promise<Adquisicion[]> {
    return fetch('http://localhost:8080/adq/sel')
      .then(response => response.json());
  }
//----------------------------------------------------------
}
