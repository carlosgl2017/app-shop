import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
   
    catcod: '',
    catdescrip: '',
    categ: '',
    catestado: '',
    catlinea: '',
    catpreciounit: '',
    catsublinea: '',
    catunidad: ''
  }
  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoria.catid = this.route.snapshot.paramMap.get('catid')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.categoria.catid!).subscribe((respuesta) => {
      this.categoria.catcod = respuesta.catcod
      this.categoria.catdescrip = respuesta.catdescrip
      this.categoria.categ = respuesta.categ
      this.categoria.catestado = respuesta.catestado
      this.categoria.catlinea = respuesta.catlinea
      this.categoria.catpreciounit = respuesta.catpreciounit
      this.categoria.catlinea = respuesta.catlinea
      this.categoria.catunidad = respuesta.catunidad
    })
  }

  delete(): void {
    this.service.delete(this.categoria.catid!).subscribe((respuesta) => {
      this.router.navigate(['categorias'])
      this.service.mensagem('Categoria eliminada con éxito!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }
  
  cancel(): void {
    this.router.navigate(['categorias'])
  }

}
