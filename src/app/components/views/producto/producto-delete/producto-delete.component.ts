import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-delete',
  templateUrl: './producto-delete.component.html',
  styleUrls: ['./producto-delete.component.css']
})
export class ProductoDeleteComponent implements OnInit {
    producto: Producto = {
    prodid: '',
    catid: '',
    proddescrip: '',
    prodestado: '',
    prodprecioventa: '',
    prodimagtxt: '',
  }
  constructor(private service: ProductoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.producto.prodid = this.route.snapshot.paramMap.get('prodid')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.producto.prodid!).subscribe((respuesta) => {
      this.producto.catid = respuesta.catid
      this.producto.proddescrip = respuesta.proddescrip
      this.producto.prodestado = respuesta.prodestado
      this.producto.prodprecioventa = respuesta.prodprecioventa
      this.producto.prodimagtxt = respuesta.prodimagtxt
    })
  }

  delete(): void {
      this.service.delete(this.producto.prodid!).subscribe((respuesta) => {
      this.router.navigate(['productos'])
      this.service.mensagem('producto  eliminado con éxito!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void {
    this.router.navigate(['productos'])
  }

}
