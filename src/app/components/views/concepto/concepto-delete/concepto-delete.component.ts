import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concepto } from '../concepto';
import { ConceptoService } from '../concepto.service';
@Component({
  selector: 'app-concepto-delete',
  templateUrl: './concepto-delete.component.html',
  styleUrls: ['./concepto-delete.component.css']
})
export class ConceptoDeleteComponent implements OnInit {
  concepto: Concepto = {
    conid: '',
    gruid: '',
    condescrip: '',
    conabrev: '',
    conval: '',
    ctrllog:''
  }

  constructor(private service: ConceptoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.concepto.conid = this.route.snapshot.paramMap.get('conid')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.concepto.conid!).subscribe((respuesta) => {
      this.concepto.conid = respuesta.conid;
      this.concepto.gruid = respuesta.gruid;
      this.concepto.condescrip = respuesta.condescrip;
      this.concepto.conabrev = respuesta.conabrev;
      this.concepto.conval = respuesta.conval;
    })
  }

  delete(): void {
    this.service.delete(this.concepto.conid!).subscribe((respuesta) => {
      this.router.navigate(['conceptos'])
      this.service.mensagem('-->Concepto eliminada con éxito!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void {
    this.router.navigate(['conceptos'])
  }

}

