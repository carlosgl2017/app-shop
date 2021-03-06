import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { AdquisicionService } from "../../adquisicion/adquisicion.service";
import { Proveedor } from "../proveedor";
import { ProveedorService } from "../proveedor.service";

@Component({
  selector: "app-add-edit-proveedor",
  templateUrl: "./add-edit-proveedor.component.html",
  styleUrls: ["./add-edit-proveedor.component.css"],
})
export class AddEditProveedorComponent implements OnInit {
  //para editar
  provid: any;
  accion = "Crear";
  //para editar
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ProveedorService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({     
      ctrllog: [""],
      provcinit: [""],
      provdepto: [""],
      provdirec: [""],
      provemail: [""],
      provempresa: [""],
      provestado: [""],
      provfax: [""],
      provlugar: [""],
      provnombre: [""],
      provapellidos: [""],
      provtelef: [""],
      provtipo: [""],
      provurl: [""],
    });
    const idParam = 'provid';
    this.provid = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.provid !== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
  }

  create() {
    const proveedor: Proveedor = {     
      ctrllog: this.myForm.get("ctrllog").value,
      provcinit: this.myForm.get("provcinit").value,
      provdepto: this.myForm.get("provdepto").value,
      provdirec: this.myForm.get("provdirec").value,
      provemail: this.myForm.get("provemail").value,
      provempresa: this.myForm.get("provempresa").value,
      provestado: this.myForm.get("provestado").value,
      provfax: this.myForm.get("provfax").value,
      provlugar: this.myForm.get("provlugar").value,
      provnombre: this.myForm.get("provnombre").value,
      provapellidos: this.myForm.get("provapellidos").value,
      provtelef: this.myForm.get("provtelef").value,
      provtipo: this.myForm.get("provtipo").value,
      provurl: this.myForm.get("provurl").value,
    };
    if (this.provid !== undefined) {
      this.update(proveedor);
    } else {
      this.service.create(proveedor).subscribe(
        (respuesta) => {
          this.router.navigate(["proveedores"]);
          this.service.mensagem("proveedor creado con ??xito!");
        },
        (err) => {
          for (let i = 0; i < err.error.errors.length; i++) {
            this.service.mensagem(err.error.errors[i].message);
          }
        }
      );
    }
  }

  update(proveedor: Proveedor): void {
    this.service.update(proveedor, this.provid).subscribe(
      (respuesta) => {
        this.router.navigate(["proveedores"]);
        this.service.mensagem("proveedor actualizado con ??xito");
      },
      (err) => {
        this.service.mensagem("debe llenar todos los campos!");
      }
    );
  }

  esEditar(): void {
    this.service.findById(this.provid).subscribe((respuesta) => {
      this.myForm.patchValue({       
        provcinit: respuesta.provcinit,
        provdepto: respuesta.provdepto,
        provdirec: respuesta.provdirec,
        provemail: respuesta.provemail,
        provempresa: respuesta.provempresa,
        provestado: respuesta.provestado,
        provfax: respuesta.provfax,
        provlugar: respuesta.provlugar,
        provnombre: respuesta.provnombre,
        provapellidos: respuesta.provapellidos,
        provtelef: respuesta.provtelef,
        provtipo: respuesta.provtipo,
        provurl: respuesta.provurl,
      });
    });
  }
}
