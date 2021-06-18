import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import { Categoria } from '../../categoria/categoria';
import { CategoriaService } from '../../categoria/categoria.service'; */
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {
  producto: Producto = {
 
    catid: '',
    proddescrip: '',
    prodestado: '',
    prodprecioventa: '',
    prodimagtxt:''
  }
/*   categorias: Categoria[] = []; */
  constructor(private service: ProductoService/* ,private servicio:CategoriaService */, private router: Router) { }
  ngOnInit(): void {
   /*  this.findAllCategorias(); */
  }
  //obtener categorias
  /* findAllCategorias() {
    this.servicio.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.categorias = respuesta;
    });
  } */
  categoriaControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  //----

  create(): void {
    this.service.create(this.producto).subscribe((respuesta) => {
      this.router.navigate(['productos'])
      this.service.mensagem('producto creado con éxito!');
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }
  cancel(): void {
    this.router.navigate(['productos'])
  }

}
