import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";

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
  Date,
  String,
  String,
  String,
  String,
  String
];

@Component({
  selector: "app-reportecliente",
  templateUrl: "./reportecliente.component.html",
  styleUrls: ["./reportecliente.component.css"],
})
export class ReporteclienteComponent implements OnInit {
  fechaini: string;
  fechafin: string;
  clientes: Cliente[];
  constructor(
    private service: ClienteService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe
  ) {
    this.dateAdapter.setLocale("es-ES"); //idoma de los dias y meses del calendario
    dateAdapter.getFirstDayOfWeek = () => 1; //empieza en lunes el primer dia del calendario
  }

  date = new Date();

  ngOnInit(): void {}

  reporte(fechaini: string, fechafin: string): void {

    this.service.filtrarFecha(fechaini, fechafin).subscribe((respuesta) => {
      this.clientes = respuesta;
      this.generate();
      console.log(respuesta);
    });
  }

  //----------------------------------------------------------
  async generate() {
    const pdf = new PdfMakeWrapper();
    //const data = await this.fetchData();
    pdf.info({
      title: "Reporte Adquisiciones",
      author: "Consultor IDI",
      subject: "@mi.empresa.bo",
    });
    pdf.pageSize("LETTER");
    pdf.pageOrientation("portrait");
    //pdf.pageOrientation('landscape');
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
      new Txt("LISTADO DE CLIENTES").alignment("center").fontSize(13).bold().end
    );
    pdf.add("\n");
    pdf.add(this.creaTable(this.clientes));
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
  creaTable(clientes: Cliente[]): ITable {
    [{}];
    return new Table([
      [
        "ID",
        "NOMBRE",
        "APELLIDOS",
        "SEXO",
        "F. NAC.",
        "TIPO DOC.",
        "NUMERO DOC.",
        "DIRECCIÓN",
        "TELEFONO",
        "EMAIL"
      ],
      ...this.extractData(clientes),
    ])
      .fontSize(10)
      .alignment("center").end;
  }
  extractData(clientes: Cliente[]): TableRow[] {
    return clientes.map((row) => [
      row.cliid,
      row.nombre,
      row.apellidos,
      row.sexo,
      row.fechanacimiento,
      row.tipo_documento,
      row.numero_doc,
      row.direccion,
      row.telefono,
      row.email
    ]);
  }
  /*  async fetchData(): Promise<Cliente[]> {
    //localhost:8080/cli/sel/fechanac///
    //return fetch("http://localhost:8080/adq/sel").then((response) =>
    return fetch("localhost:8080/cli/sel/fechanac").then((response) =>
      response.json()
    );
  }  */
  //----------------------------------------------------------
}
