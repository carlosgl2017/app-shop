import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { MensajeConfirmacionComponent } from "src/app/components/shared/mensaje-confirmacion/mensaje-confirmacion.component";
import { Cliente } from "../../cliente/cliente";
import { ClienteService } from "../../cliente/cliente.service";
import { VentaService } from "../venta.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-venta-cliente-filtro",
  templateUrl: "./venta-cliente-filtro.component.html",
  styleUrls: ["./venta-cliente-filtro.component.css"],
})
export class VentaClienteFiltroComponent implements OnInit {
  cliente: Cliente;
  
  constructor(
    private ventaService:VentaService,
    private activatedRoute: ActivatedRoute,    
    private snackBar: MatSnackBar,
    private router:Router,
    private clienteService: ClienteService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    /*--------para obtener parametro por ruta--------*/
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get("id");
      this.clienteService.findById(id).subscribe((respuesta) => {
        this.cliente = respuesta;
      });
    });     
  }

  delete(index: number): void {
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: "350px",
      data: { mensaje: "Esta seguro que desea eliminar el la venta" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "aceptar") {
        this.ventaService.delete(index).subscribe(
          (respuesta) => {
            this.router.navigate(["ventas"]);
            this.ventaService.mensagem("venta  eliminado con éxito!");
            //this.findAll();
            this.snackBar.open("La venta fue eliminado con éxito", "", {
              duration: 3000,
            });
          },
          (err) => {
            this.ventaService.mensagem(err.error.error);
          }
        );
      }
    });
  }
}
