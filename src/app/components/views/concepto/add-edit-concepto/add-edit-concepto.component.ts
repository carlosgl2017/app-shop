import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Concepto } from "../concepto";
import { ConceptoService } from "../concepto.service";

@Component({
  selector: "app-add-edit-concepto",
  templateUrl: "./add-edit-concepto.component.html",
  styleUrls: ["./add-edit-concepto.component.css"],
})
export class AddEditConceptoComponent implements OnInit {
  //para editar
  conid: any;
  accion = "Crear";
  //para editar
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ConceptoService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      conid: [""],
      conabrev: [""],
      condescrip: [""],
      conval: [""],
      ctrllog: [""],
      gruid: [""],
    });
    const idParam = "conid";
    this.conid = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.conid !== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
  }
  create() {
    const concepto: Concepto = {
      conid: this.myForm.get("conid").value,
      conabrev: this.myForm.get("conabrev").value,
      condescrip: this.myForm.get("condescrip").value,
      conval: this.myForm.get("conval").value,
      ctrllog: this.myForm.get("ctrllog").value,
      gruid: this.myForm.get("gruid").value,
    };
    if (this.conid !== undefined) {
      this.update(concepto);
    } else {
      this.service.create(concepto).subscribe(
        (respuesta) => {
          this.router.navigate(["conceptos"]);
          this.service.mensagem("concepto creado con éxito!");
        },
        (err) => {
          for (let i = 0; i < err.error.errors.length; i++) {
            this.service.mensagem(err.error.errors[i].message);
          }
        }
      );
    }
  }

  update(concepto: Concepto): void {
    this.service.update(concepto, this.conid).subscribe(
      (respuesta) => {
        this.router.navigate(["conceptos"]);
        this.service.mensagem("Concepto actualizado con éxito");
      },
      (err) => {
        this.service.mensagem("debe llenar todos los campos!");
      }
    );
  }

  esEditar(): void {
    this.service.findById(this.conid).subscribe((respuesta) => {
      this.myForm.patchValue({
        conabrev :respuesta.conabrev,
        condescrip :respuesta.condescrip,
        conval:respuesta.conval,
        gruid:respuesta.gruid
      });
    });
  }
}
