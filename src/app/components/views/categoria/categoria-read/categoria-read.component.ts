import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];
  displayedColumns: string[] = ["catid", "catcod", "catdescrip", "categ","catestado","catlinea","catpreciounit","catsublinea","catunidad", "acciones"];
  constructor(private service: CategoriaService, private router: Router) { }


  ngOnInit(): void {
    this.findAll();
  }
  
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.categorias = respuesta;
    });
  }

  navegarParaCategoriaCreate() {
    this.router.navigate(["categorias/create"])
  }

}
