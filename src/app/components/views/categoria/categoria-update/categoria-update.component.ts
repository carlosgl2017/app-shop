import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    catid: "",
    catcod: "",
    catdescrip: "",
    categ: "",
    catestado: "",
    catlinea: "",
    catpreciounit: "",
    catsublinea: "",
    catunidad: ""
  };
  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoria.catid = this.route.snapshot.paramMap.get("catid")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.catid!).subscribe((respuesta) => {
      this.categoria.catcod = respuesta.catcod;
      this.categoria.catdescrip = respuesta.catdescrip;
      this.categoria.categ = respuesta.categ;
      this.categoria.catestado = respuesta.catestado;
      this.categoria.catlinea = respuesta.catlinea;
      this.categoria.catpreciounit = respuesta.catpreciounit;
      this.categoria.catsublinea = respuesta.catsublinea;
      this.categoria.catunidad = respuesta.catunidad;
    });
  }

  update(): void {
    this.service.update(this.categoria).subscribe((respuesta) => {
      this.router.navigate(["categorias"]);
      this.service.mensagem("Categoria actualiza con éxito");
    }, err => {
      this.service.mensagem('debe llenar todos los campos!')
    });
  }

  cancel(): void {
    this.router.navigate(['categorias'])
  }
  


}
