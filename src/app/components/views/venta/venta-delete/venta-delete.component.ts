import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venta } from '../venta.model';
import { VentaService } from '../venta.service';

@Component({
  selector: 'app-venta-delete',
  templateUrl: './venta-delete.component.html',
  styleUrls: ['./venta-delete.component.css']
})
export class VentaDeleteComponent implements OnInit {

  venta: Venta = {
    venid: '',
    vendescrip: '',
    venestado: '',
    venfecha: '',
    vennrocomprobante: '',
    ventipo: '',
    ventipocomprobante: '',
    ventotal: '',
    ctrllog: '',
  }
  constructor(private service: VentaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.venta.venid = this.route.snapshot.paramMap.get('venid')!
    this.findById()
  }
  findById(): void {
    this.service.findById(this.venta.venid!).subscribe((resposta) => {
      this.venta.vendescrip = resposta.vendescrip
      this.venta.venestado = resposta.venestado
      this.venta.venfecha = resposta.venfecha
      this.venta.vennrocomprobante = resposta.vennrocomprobante
      this.venta.ventipo = resposta.ventipo
      this.venta.ventipocomprobante = resposta.ventipocomprobante
      this.venta.ventotal = resposta.ventotal
      this.venta.ctrllog = resposta.ctrllog
    })
  }

  delete(): void {
    this.service.delete(this.venta.venid!).subscribe((resposta) => {
      this.router.navigate(['ventas'])
      this.service.mensagem('venta eliminada con exito!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void {
    this.router.navigate(['ventas'])
  }

}
