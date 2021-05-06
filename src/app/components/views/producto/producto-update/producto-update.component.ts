import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto.model';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css']
})
export class ProductoUpdateComponent implements OnInit {

  producto: Producto = {
    prodid: "",
    catid: "",
    proddescrip: "",
    prodestado: "",
    prodprecioventa: "",
  };

  constructor(
    private service: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.producto.prodid = this.route.snapshot.paramMap.get("prodid")!;
    this.findById();
  }

  findById(): void {
      this.service.findById(this.producto.prodid!).subscribe((resposta) => {
      this.producto.catid = resposta.catid;
      this.producto.proddescrip = resposta.proddescrip;
      this.producto.prodestado = resposta.prodestado;
      this.producto.prodprecioventa = resposta.prodprecioventa;
    });
  }

  update(): void {
    this.service.update(this.producto).subscribe((respuesta) => {
      this.router.navigate(["productos"]);
      this.service.mensagem("Producto actualizado con éxito");
    }, err => {
      this.service.mensagem('Verifique que todos los campos esten llenados!')
    });
  }

  cancel(): void {
    this.router.navigate(['productos'])
  }


}
