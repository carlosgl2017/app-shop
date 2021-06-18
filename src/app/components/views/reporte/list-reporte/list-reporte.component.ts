import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper,Txt } from 'pdfmake-wrapper';


@Component({
  selector: 'app-list-reporte',
  templateUrl: './list-reporte.component.html',
  styleUrls: ['./list-reporte.component.css']
})
export class ListReporteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatedPDF(){
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('Hello world').bold().end
    );
    pdf.create().open();
  }

}
