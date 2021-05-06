import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venta } from '../venta.model';
import { VentaService } from '../venta.service';

@Component({
  selector: 'app-venta-update',
  templateUrl: './venta-update.component.html',
  styleUrls: ['./venta-update.component.css']
})
export class VentaUpdateComponent implements OnInit {
  venta: Venta = {
    venid: "",
    vendescrip: "",
    venestado: "",
    venfecha: "",
    vennrocomprobante: "",
    ventipo: "",
    ventipocomprobante: "",
    ventotal: "",
    ctrllog: ""
  };
  constructor(
    private service: VentaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.venta.venid = this.route.snapshot.paramMap.get("venid")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.venta.venid!).subscribe((resposta) => {
      this.venta.vendescrip = resposta.vendescrip;
      this.venta.venestado = resposta.venestado;
      this.venta.venfecha = resposta.venfecha;
      this.venta.vennrocomprobante = resposta.vennrocomprobante;
      this.venta.ventipo = resposta.ventipo;
      this.venta.ventipocomprobante = resposta.ventipocomprobante;
      this.venta.ventotal = resposta.ventotal;
      this.venta.ctrllog = resposta.ctrllog;
    });
  }

  update(): void {
    this.service.update(this.venta).subscribe((resposta) => {
      this.router.navigate(["ventas"]);
      this.service.mensagem("Venta se actualizó con éxito");
    }, err => {
      this.service.mensagem('Validar que todos los campos esten llenados corretamente!')
    });
  }

  cancel(): void {
    this.router.navigate(['ventas'])
  }

}
