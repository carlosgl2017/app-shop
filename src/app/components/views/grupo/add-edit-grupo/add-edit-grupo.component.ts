import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Grupo } from "../grupo";
import { GrupoService } from "../grupo.service";

@Component({
  selector: "app-add-edit-grupo",
  templateUrl: "./add-edit-grupo.component.html",
  styleUrls: ["./add-edit-grupo.component.css"],
})
export class AddEditGrupoComponent implements OnInit {
  //para editar
  gruid: any;
  accion = "Crear";
  //para editar
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: GrupoService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      grudescrip: [""],
    });
    const idParam = "gruid";
    this.gruid = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.gruid !== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
  }

  create() {
    const grupo: Grupo = {
      grudescrip: this.myForm.get("grudescrip").value
    };
    if (this.gruid !== undefined) {
      this.update(grupo);
    } else {
      this.service.create(grupo).subscribe(
        (respuesta) => {
          this.router.navigate(["grupos"]);
          this.service.mensagem("Grupo creado con éxito!");
        },
        (err) => {
          for (let i = 0; i < err.error.errors.length; i++) {
            this.service.mensagem(err.error.errors[i].message);
          }
        }
      );
    }
  }

  update(grupo: Grupo): void {
    this.service.update(grupo, this.gruid).subscribe(
      (respuesta) => {
        this.router.navigate(["grupos"]);
        this.service.mensagem("grupo actualizado con éxito");
      },
      (err) => {
        this.service.mensagem("debe llenar todos los campos!");
      }
    );
  }

  esEditar(): void {
    this.service.findById(this.gruid).subscribe((respuesta) => {
      this.myForm.patchValue({
        grudescrip: respuesta.grudescrip,
      });
    });
  }
}
