import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venta } from '../venta.model';
import { VentaService } from '../venta.service';

@Component({
  selector: 'app-venta-read',
  templateUrl: './venta-read.component.html',
  styleUrls: ['./venta-read.component.css']
})
export class VentaReadComponent implements OnInit {
  ventas: Venta[] = []
  displayedColumns: string[] = ['venid', 'vendescrip', 'venestado', 'venfecha', 'vennrocomprobante', 'ventipo', 'ventipocomprobante', 'ventotal', 'ctrllog', 'ventas', 'acciones'];
  constructor(private service: VentaService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.ventas = respuesta;
    });
  }

  navegarParaVentaCreate() {
    this.router.navigate(["ventas/create"])
  }

}
