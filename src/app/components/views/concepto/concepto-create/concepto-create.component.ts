import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concepto } from '../concepto';
import { ConceptoService } from '../concepto.service';
@Component({
  selector: 'app-concepto-create',
  templateUrl: './concepto-create.component.html',
  styleUrls: ['./concepto-create.component.css']
})
export class ConceptoCreateComponent implements OnInit {

  concepto: Concepto = {
    gruid: '',
    condescrip: '',
    conabrev: '',
    conval: '',
    ctrllog: ''
  }

  constructor(private service: ConceptoService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.concepto).subscribe((respuesta) => {
      this.router.navigate(['conceptos'])
      this.service.mensagem('--->Conceptos creada con éxito!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }
  cancel(): void {
    this.router.navigate(['conceptos'])
  }
}
