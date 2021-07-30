import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Venta } from '../venta';
import { VentaService } from '../venta.service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.css']
})
export class VentaDetalleComponent implements OnInit {
  venta:Venta;
  titulo:string='Venta';

  constructor(
    private ventaservice:VentaService,
    private activatedRoute:ActivatedRoute //para obtener parametro por ruta
  ) { }

  ngOnInit(): void {
    /*--------para obtener parametro por ruta--------*/
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('id');
      this.ventaservice.findById(id).subscribe(respuesta =>{
        this.venta = respuesta;
      })
    })
  }

}
