import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Producto } from '../producto';
import { ProductoService } from '../producto.service'; 
import {  Canvas,  IImg,  Img,  IStack,  ITable,  PdfMakeWrapper,  QR,  Rect,  Stack,  Table,  TextReference,  Txt,} from "pdfmake-wrapper";
import { DateAdapter } from "@angular/material/core"; //para las fechas
import { DatePipe } from "@angular/common";
import { AuthService } from '../../usuarios/auth.service';
type TableRow = [
  number,
  string,
  string,
  String
];

@Component({
  selector: 'app-reporteproducto',
  templateUrl: './reporteproducto.component.html',
  styleUrls: ['./reporteproducto.component.css']
})
export class ReporteproductoComponent implements OnInit {

  fechaini: string;
  fechafin: string;
  productos:Producto[];
  constructor(
    private service: ProductoService,
    private serviceauth:AuthService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe
  ) {
    this.dateAdapter.setLocale("es-ES"); //idoma de los dias y meses del calendario
    dateAdapter.getFirstDayOfWeek = () => 1; //empieza en lunes el primer dia del calendario
  }

  date = new Date();

  ngOnInit(): void {
  }

  reporteProd(fechaini: string, fechafin: string): void {

    this.service.filtrarProductosByFecha(fechaini, fechafin).subscribe((respuesta) => {
      this.productos = respuesta;
      this.generate();
      console.log(respuesta);
    });
  }

  //----------------------------------------------------------
  async generate() {
    const pdf = new PdfMakeWrapper();
    //const data = await this.fetchData();
    pdf.info({
      title: "Reporte de productos",
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
      new Txt("USUARIO: " + this.serviceauth.usuario.nombre+' ' +this.serviceauth.usuario.apellido)
        .alignment("right")
        .margin([300, -10, -15, -15])
        .fontSize(8)
        .italics().end
    );
    pdf.add(
      new Txt("LISTADO DE PRODUCTOS").alignment("center").fontSize(13).bold().end
    );
    pdf.add("\n");
    pdf.add(this.creaTable(this.productos));
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
  creaTable(productos: Producto[]): ITable {
    [{}];
    return new Table([
      [
        "ID",
        "PRODUCTO",
        "DESCRIPCIÓN",
        "ESTADO"
      ],
      ...this.extractData(productos),
    ])
      .fontSize(10)
      .alignment("center").end;
  }
  extractData(productos: Producto[]): TableRow[] {
    return productos.map((row) => [
      row.prodid,
      row.prodnombre,
      row.proddescrip,
      row.prodestado
    ]);
  }
}
