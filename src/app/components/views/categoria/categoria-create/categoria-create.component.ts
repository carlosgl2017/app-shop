import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Concepto } from '../../concepto/concepto';
import { ConceptoService } from '../../concepto/concepto.service';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {
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
  lineas: Concepto[] = [];
  sublineas: Concepto[] = [];
  unidades: Concepto[] = [];
  constructor(private service: CategoriaService,private service1: ConceptoService,private service2:ConceptoService,private service3:ConceptoService, private router: Router) { }

  ngOnInit(): void {
    this.listarLineas();
    this.listarSubLineas();
    this.listarUnidades();
  }

  create(): void {
      this.service.create(this.categoria).subscribe((respuesta) => {
      this.router.navigate(['categorias'])
      this.service.mensagem('Categoria creada con éxito!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['categorias'])
  }

  //obtener líneas
  listarLineas() {
    this.service1.listarLineas().subscribe((respuesta) => {
      console.log(respuesta);
      this.lineas = respuesta;
    });
  }
  lineaControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
 //get sublíneas
 listarSubLineas() {
  this.service2.listarSubLineas().subscribe((respuesta) => {
    console.log(respuesta);
    this.sublineas = respuesta;
  });
}

listarUnidades() {
  this.service2.listarUnidades().subscribe((respuesta) => {
    console.log(respuesta);
    this.unidades = respuesta;
  });
}


}
