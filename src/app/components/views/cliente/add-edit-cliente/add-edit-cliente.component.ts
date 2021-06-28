import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-add-edit-cliente',
  templateUrl: './add-edit-cliente.component.html',
  styleUrls: ['./add-edit-cliente.component.css']
})
export class AddEditClienteComponent implements OnInit {
  tiposDocumentos: any[] = ['CI', 'Pasaporte', 'Otro'];
  //para editar
  cliid: any;
  accion = "Crear";
  //para editar
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      cliid: [""],
      apellidos: [""],
      direccion: [""],
      email: ["",[Validators.email]],
      fecha_nacimiento: ["",Validators.required],
      nombre: ["",[Validators.required]],
      numero_doc: ["",[Validators.required]],
      sexo: [""],
      telefono: [""],
      tipo_documento: ["",[Validators.required]],
    });
    const idParam = "cliid";
    this.cliid = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.cliid !== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
  }
  create() {
    const cliente: Cliente = {
      cliid: this.myForm.get("cliid").value,
      apellidos: this.myForm.get("apellidos").value,
      direccion: this.myForm.get("direccion").value,
       email: this.myForm.get("email").value,
      fecha_nacimiento: this.myForm.get("fecha_nacimiento").value,
      nombre: this.myForm.get("nombre").value,
      numero_doc: this.myForm.get("numero_doc").value,
      sexo: this.myForm.get("sexo").value,
      telefono: this.myForm.get("telefono").value,
      tipo_documento: this.myForm.get("tipo_documento").value,
    };
    if (this.cliid !== undefined) {
      this.update(cliente);
    } else {
      this.service.create(cliente).subscribe(
        (respuesta) => {
          this.router.navigate(["clientes"]);
          this.service.mensagem("Cliente creado con éxito!");
        },
        (err) => {
          for (let i = 0; i < err.error.errors.length; i++) {
            this.service.mensagem(err.error.errors[i].message);
          }
        }
      );
    }
  }

  update(cliente: Cliente): void {
    this.service.update(cliente, this.cliid).subscribe(
      (respuesta) => {
        this.router.navigate(["clientes"]);
        this.service.mensagem("cliente actualizado con éxito");
      },
      (err) => {
        this.service.mensagem("debe llenar todos los campos!");
      }
    );
  }

  esEditar(): void {
    this.service.findById(this.cliid).subscribe((respuesta) => {
      this.myForm.patchValue({
        apellidos  :respuesta.apellidos ,
        direccion :respuesta.direccion,
        email:respuesta.email,
        fecha_nacimiento:respuesta.fecha_nacimiento,
        nombre:respuesta.nombre,
        numero_doc:respuesta.numero_doc,
        sexo:respuesta.sexo,
        telefono:respuesta.telefono,
        tipo_documento:respuesta.tipo_documento
      });
    });
  }
}
