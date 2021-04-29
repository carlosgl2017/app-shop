import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venta } from '../venta.model';
import { VentaService } from '../venta.service';

@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css']
})
export class VentaCreateComponent implements OnInit {

  venta: Venta = {
    vendescrip: '',
    venestado: '',
    venfecha: '',
    vennrocomprobante: '',
    ventipo: '',
    ventipocomprobante: '',
    ventotal: '',
    ctrllog: ''
  }
  constructor(private service:VentaService,private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.venta).subscribe((resposta) => {
      this.router.navigate(['ventas'])
      this.service.mensagem('Venta registrada con exito!');
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['ventas'])
  }

}
