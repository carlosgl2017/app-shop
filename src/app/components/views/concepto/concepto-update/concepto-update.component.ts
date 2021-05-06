import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concepto } from '../concepto';
import { ConceptoService } from '../concepto.service';
@Component({
  selector: 'app-concepto-update',
  templateUrl: './concepto-update.component.html',
  styleUrls: ['./concepto-update.component.css']
})
export class ConceptoUpdateComponent implements OnInit {
  concepto: Concepto = {
    conid: '',
    gruid: '',
    condescrip: '',
    conabrev: '',
    conval: '',
    ctrllog: ''
  };
  constructor(
    private service: ConceptoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.concepto.conid = this.route.snapshot.paramMap.get('conid')!;
    this.findById();
  }
  findById(): void {
    this.service.findById(this.concepto.conid!).subscribe((respuesta) => {
      this.concepto.gruid = respuesta.gruid;
      this.concepto.condescrip = respuesta.condescrip;
      this.concepto.conabrev = respuesta.conabrev;
      this.concepto.conval = respuesta.conval;
      this.concepto.ctrllog=respuesta.ctrllog;
    });
  }
  update(): void {
    this.service.update(this.concepto).subscribe((respuesta) => {
      this.router.navigate(['conceptos']);
      this.service.mensagem('--->Concepto actualizado con éxito');
    }, err => {
      this.service.mensagem('debe llenar todos los campos!')
    });
  }
  cancel(): void {
    this.router.navigate(['conceptos'])
  }
}
