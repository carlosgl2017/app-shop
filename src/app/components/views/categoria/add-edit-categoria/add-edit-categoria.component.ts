import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "../categoria";
import { CategoriaService } from "../categoria.service";

@Component({
  selector: "app-add-edit-categoria",
  templateUrl: "./add-edit-categoria.component.html",
  styleUrls: ["./add-edit-categoria.component.css"],
})
export class AddEditCategoriaComponent implements OnInit {
  //para editar
  catid: any;
  accion = "Crear";
  //para editar
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: CategoriaService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      catid: [""],
      nombre: ["",[Validators.required]],
      descripcion: [""],
      linea: [""],
      sublinea: [""],
    });
    const idParam = "catid";
    this.catid = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.catid !== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
  }
  create() {
    const categoria: Categoria = {
      catid: this.myForm.get("catid").value,
      nombre: this.myForm.get("nombre").value,
      descripcion: this.myForm.get("descripcion").value,
      linea: this.myForm.get("linea").value,
      sublinea: this.myForm.get("sublinea").value 
    };
    if (this.catid !== undefined) {
      this.update(categoria);
    } else {
      this.service.create(categoria).subscribe(
        (respuesta) => {
          this.router.navigate(["categorias"]);
          this.service.mensagem("Categoria creada con éxito!");
        },
        (err) => {
          for (let i = 0; i < err.error.errors.length; i++) {
            this.service.mensagem(err.error.errors[i].message);
          }
        }
      );
    }
  }

  update(categoria: Categoria): void {
    this.service.update(categoria, this.catid).subscribe(
      (respuesta) => {
        this.router.navigate(["categorias"]);
        this.service.mensagem("categoria actualizada con éxito");
      },
      (err) => {
        this.service.mensagem("debe llenar todos los campos!");
      }
    );
  }

  esEditar(): void {
    this.service.findById(this.catid).subscribe((respuesta) => {
      this.myForm.patchValue({
        nombre: respuesta.nombre,
        descripcion: respuesta.descripcion,
        linea: respuesta.linea,
        sublinea: respuesta.sublinea,
      });
    });
  }
}
