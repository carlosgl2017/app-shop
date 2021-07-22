import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import { CategoriaService } from '../../categoria/categoria.service';
import { Categoria } from '../../categoria/categoria';

@Component({
  selector: 'app-add-edit-producto',
  templateUrl: './add-edit-producto.component.html',
  styleUrls: ['./add-edit-producto.component.css']
})
export class AddEditProductoComponent implements OnInit {
//get all category
categorias: Categoria[] = []; 
opcionesEstado: any[] = ['activado', 'desactivado'];
//para editar
prodid: any;
accion = "Añadir";
//para editar
myForm: FormGroup;
constructor(
  private fb: FormBuilder,
  private service: ProductoService,
  private router: Router,
  private aRoute: ActivatedRoute,
  private snackBar: MatSnackBar,
  private serviceCategoria:CategoriaService
) {
  this.myForm = this.fb.group({
    prodid: [""],
    prodnombre: ["",[Validators.required]],
    proddescrip: [""],
    prodestado: [""],
    categoria_id: [""],
    tipo_documento: [""],
  });
  const idParam = "prodid";
  this.prodid = this.aRoute.snapshot.params[idParam];
}

ngOnInit(): void {
  if (this.prodid !== undefined) {
    this.accion = "Editar";
    this.esEditar();
  }
  this.findAllCategorias();
}
create() {
  const producto: Producto = {
    prodid: this.myForm.get("prodid").value,
    prodnombre: this.myForm.get("prodnombre").value,
    proddescrip: this.myForm.get("proddescrip").value,
    categoria_id: this.myForm.get("categoria_id").value,
  };
  if (this.prodid !== undefined) {
    this.update(producto);
  } else {
    this.service.create(producto).subscribe(
      (respuesta) => {
        this.router.navigate(["productos"]);
        this.service.mensagem("Producto creado con éxito!");
      },
      (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          this.service.mensagem(err.error.errors[i].message);
        }
      }
    );
  }
}

update(producto: Producto): void {
  this.service.update(producto, this.prodid).subscribe(
    (respuesta) => {
      this.router.navigate(["productos"]);
      this.service.mensagem("producto actualizado con éxito");
    },
    (err) => {
      this.service.mensagem("debe llenar todos los campos!");
    }
  );
}

esEditar(): void {
  this.service.findById(this.prodid).subscribe((respuesta) => {
    this.myForm.patchValue({
      prodnombre  :respuesta.prodnombre ,
      proddescrip :respuesta.proddescrip,
      prodestado:respuesta.prodestado,
      categoria_id:respuesta.categoria_id,
    });
  });
}

//obtener categorias
findAllCategorias() {
  this.serviceCategoria.findAll().subscribe((respuesta) => {
    console.log(respuesta);
    this.categorias = respuesta;
  });
}

}
