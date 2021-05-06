import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concepto } from '../concepto';
import { ConceptoService } from '../concepto.service';

@Component({
  selector: 'app-concepto-read',
  templateUrl: './concepto-read.component.html',
  styleUrls: ['./concepto-read.component.css']
})
export class ConceptoReadComponent implements OnInit {
  conceptos: Concepto[] = [];
  displayedColumns: string[] = ["conid", "gruid", "condescrip", "conabrev", "conval", "acciones"];
  constructor(private service: ConceptoService, private router: Router) { }
  ngOnInit(): void {
    this.findAll();
  }
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.conceptos = respuesta;
    });
  }

  navegarParaConceptoCreate() {
    this.router.navigate(['conceptos/create'])
  }

}
