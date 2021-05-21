import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Producto } from "../producto";
import { ProductoService } from "../producto.service";
import swal from "sweetalert2";
@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"],
})
export class DetalleComponent implements OnInit {
  producto: Producto;
  private fotoSeleccionada: File;
  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let prodid = params.get("prodid");
      if (prodid) {
        this.productoService.findById(prodid).subscribe((producto) => {
          this.producto = producto;
        });
      }
    });
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.productoService
      .subirFoto(this.fotoSeleccionada, this.producto.prodid)
      .subscribe((producto) => {
        this.producto = producto;
        swal.fire(
          "La foto se ha subido completamente",
          `La foto se ha subido con exito:${this.producto.prodimagtxt}`,
          "success"
        );
      });
  }
  cancel(): void {
    this.router.navigate(['productos'])
  }
}
