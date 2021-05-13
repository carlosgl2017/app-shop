import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  producto :Producto;
  constructor(private productoService:ProductoService, private activatedRote: ActivatedRoute) { }
  ngOnInit(): void { 
   /*  this.activatedRote.paramMap.subscribe(params =>{
      let id:number = +params.get('id');
      if(id){
        this.productoService.findById(id).subscribe(producto=>{
          this.producto=producto;
        })
      }
    }) */
  }

}
