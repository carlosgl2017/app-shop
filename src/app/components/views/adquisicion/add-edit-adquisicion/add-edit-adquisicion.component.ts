import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Adquisicion } from "../adquisicion";
import { AdquisicionService } from "../adquisicion.service";

@Component({
  selector: "app-add-edit-adquisicion",
  templateUrl: "./add-edit-adquisicion.component.html",
  styleUrls: ["./add-edit-adquisicion.component.css"],
})
export class AddEditAdquisicionComponent implements OnInit {
  //para editar
  adqid: any;
  accion = "Crear";
  //para editar
  myForm: FormGroup;

  /* adquisicion: Adquisicion = {
    adqid: 3,
    adq_cod_control: 0,
    adq_fec_fac_dui: null,
    adq_nit_ci_prov: "",
    adq_nro_auto: 0,
    adq_nro_dui: 0,
    adq_nro_fact: 0,
    adq_razon_social: "",
    adq_subtotal: 0,
    adq_tipo_compra: 0,
    adq_total_cred_fiscal: 0,
    adq_total_desc_bonif_rebaja_al_iva: 0,
    adq_total_importe_base_cred_fiscal: 0,
    adq_total_importe_compra: 0,
    adq_total_no_sujeto_cred_fiscal: 0,
    adqcondicpago: "",
    adqdescrip: "",
    adqdistribuidor: "",
    adqfec_vence: null,
    adqformapago: "",
    adqnotasalida: "",
    adqnro_pedido: "",
    adqobservaciones: "",
    adqreceptor: "",
    adqruta: "",
    adqtrasnporte: "",
    provid: 0,
  }; */
  constructor(
    private fb: FormBuilder,
    private service: AdquisicionService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.myForm = this.fb.group({
      adqid: ["", Validators.required],
      adq_cod_control: ["", Validators.required],
      adq_fec_fac_dui: [""],
      adq_nit_ci_prov: [""],
      adq_nro_auto: [""],
      adq_nro_dui: [""],
      adq_nro_fact: [""],
      adq_razon_social: [""],
      adq_subtotal: [""],
      adq_tipo_compra: [""],
      adq_total_cred_fiscal: [""],
      adq_total_desc_bonif_rebaja_al_iva: [""],
      adq_total_importe_base_cred_fiscal: [""],
      adq_total_importe_compra: [""],
      adq_total_no_sujeto_cred_fiscal: [""],
      adqcondicpago: [""],
      adqdescrip: [""],
      adqdistribuidor: [""],
      adqfec_vence: [""],
      adqformapago: [""],
      adqnotasalida: [""],
      adqnro_pedido: [""],
      adqobservaciones: [""],
      adqreceptor: [""],
      adqruta: [""],
      adqtrasnporte: [""],
      provid: [""],
    });
    const idParam = "adqid";
    this.adqid = this.aRoute.snapshot.params[idParam];
  }

  ngOnInit(): void {
    if (this.adqid!== undefined) {
      this.accion = "Editar";
      this.esEditar();
    }
  }

  create() {
    console.log(this.myForm);
    const adquisicion: Adquisicion = {
      adqid: this.myForm.get("adqid").value,
      adq_cod_control: this.myForm.get("adq_cod_control").value,
      adq_fec_fac_dui: this.myForm.get("adq_fec_fac_dui").value,
      adq_nit_ci_prov: this.myForm.get("adq_nit_ci_prov").value,
      adq_nro_auto: this.myForm.get("adq_nro_auto").value,
      adq_nro_dui: this.myForm.get("adq_nro_dui").value,
      adq_nro_fact: this.myForm.get("adq_nro_fact").value,
      adq_razon_social: this.myForm.get("adq_razon_social").value,
      adq_subtotal: this.myForm.get("adq_subtotal").value,
      adq_tipo_compra: this.myForm.get("adq_tipo_compra").value,
      adq_total_cred_fiscal: this.myForm.get("adq_total_cred_fiscal").value,
      adq_total_desc_bonif_rebaja_al_iva: this.myForm.get(
        "adq_total_desc_bonif_rebaja_al_iva"
      ).value,
      adq_total_importe_base_cred_fiscal: this.myForm.get(
        "adq_total_importe_base_cred_fiscal"
      ).value,
      adq_total_importe_compra: this.myForm.get("adq_total_importe_compra")
        .value,
      adq_total_no_sujeto_cred_fiscal: this.myForm.get(
        "adq_total_no_sujeto_cred_fiscal"
      ).value,
      adqcondicpago: this.myForm.get("adqcondicpago").value,
      adqdescrip: this.myForm.get("adqdescrip").value,
      adqdistribuidor: this.myForm.get("adqdistribuidor").value,
      adqfec_vence: this.myForm.get("adqfec_vence").value,
      adqformapago: this.myForm.get("adqformapago").value,
      adqnotasalida: this.myForm.get("adqnotasalida").value,
      adqnro_pedido: this.myForm.get("adqnro_pedido").value,
      adqobservaciones: this.myForm.get("adqobservaciones").value,
      adqreceptor: this.myForm.get("adqreceptor").value,
      adqruta: this.myForm.get("adqruta").value,
      adqtrasnporte: this.myForm.get("adqtrasnporte").value,
      provid: this.myForm.get("provid").value,
    };
    if (this.adqid !== undefined) {
      this.update(adquisicion);
    } else {
      this.service.create(adquisicion).subscribe(
        (respuesta) => {
          this.router.navigate(["adquisiciones"]);
          this.service.mensagem("adquisición creada con éxito!");
        },
        (err) => {
          for (let i = 0; i < err.error.errors.length; i++) {
            this.service.mensagem(err.error.errors[i].message);
          }
        }
      );
    }
  }

  update(adquisicion:Adquisicion): void {
    this.service.update(adquisicion).subscribe((respuesta) => {
      this.router.navigate(["adquisiciones"]);
      this.service.mensagem("Adquisición actualiza con éxito");
    }, err => {
      this.service.mensagem('debe llenar todos los campos!')
    });
  }

  esEditar(): void {
    this.service.findById(this.adqid).subscribe((respuesta) => {      
      this.myForm.patchValue({
      adqid: respuesta.adqid,
      adq_cod_control: respuesta.adq_cod_control,
      adq_fec_fac_dui: respuesta.adq_fec_fac_dui,
      adq_nit_ci_prov: respuesta.adq_nit_ci_prov,
      adq_nro_auto: respuesta.adq_nro_auto,
      adq_nro_dui: respuesta.adq_nro_dui,
      adq_nro_fact: respuesta.adq_nro_fact,
      adq_razon_social: respuesta.adq_razon_social,
      adq_subtotal: respuesta.adq_subtotal,
      adq_tipo_compra: respuesta.adq_tipo_compra,
      adq_total_cred_fiscal: respuesta.adq_total_cred_fiscal,
      adq_total_desc_bonif_rebaja_al_iva: respuesta.adq_total_desc_bonif_rebaja_al_iva,
      adq_total_importe_base_cred_fiscal: respuesta.adq_total_importe_base_cred_fiscal,
      adq_total_importe_compra: respuesta.adq_total_importe_compra,
      adq_total_no_sujeto_cred_fiscal: respuesta.adq_total_no_sujeto_cred_fiscal,
      adqcondicpago: respuesta.adqcondicpago,
      adqdescrip: respuesta.adqdescrip,
      adqdistribuidor: respuesta.adqdistribuidor,
      adqfec_vence: respuesta.adqfec_vence,
      adqformapago: respuesta.adqformapago,
      adqnotasalida: respuesta.adqnotasalida,
      adqnro_pedido: respuesta.adqnro_pedido,
      adqobservaciones: respuesta.adqobservaciones,
      adqreceptor: respuesta.adqreceptor,
      adqruta: respuesta.adqruta,
      adqtrasnporte: respuesta.adqtrasnporte,
      provid: respuesta.provid,
    });
    });
  }
  /*  this.myForm.patchValue({
      adqid: adquisicion.adqid,
      adq_cod_control: adquisicion.adq_cod_control,
      adq_fec_fac_dui: adquisicion.adq_fec_fac_dui,
      adq_nit_ci_prov: adquisicion.adq_nit_ci_prov,
      adq_nro_auto: adquisicion.adq_nro_auto,
      adq_nro_dui: adquisicion.adq_nro_dui,
      adq_nro_fact: adquisicion.adq_nro_fact,
      adq_razon_social: adquisicion.adq_razon_social,
      adq_subtotal: adquisicion.adq_subtotal,
      adq_tipo_compra: adquisicion.adq_tipo_compra,
      adq_total_cred_fiscal: adquisicion.adq_total_cred_fiscal,
      adq_total_desc_bonif_rebaja_al_iva: adquisicion.adq_total_desc_bonif_rebaja_al_iva,
      adq_total_importe_base_cred_fiscal: adquisicion.adq_total_importe_base_cred_fiscal,
      adq_total_importe_compra: adquisicion.adq_total_importe_compra,
      adq_total_no_sujeto_cred_fiscal: adquisicion.adq_total_no_sujeto_cred_fiscal,
      adqcondicpago: adquisicion.adqcondicpago,
      adqdescrip: adquisicion.adqdescrip,
      adqdistribuidor: adquisicion.adqdistribuidor,
      adqfec_vence: adquisicion.adqfec_vence,
      adqformapago: adquisicion.adqformapago,
      adqnotasalida: adquisicion.adqnotasalida,
      adqnro_pedido: adquisicion.adqnro_pedido,
      adqobservaciones: adquisicion.adqobservaciones,
      adqreceptor: adquisicion.adqreceptor,
      adqruta: adquisicion.adqruta,
      adqtrasnporte: adquisicion.adqtrasnporte,
      provid: adquisicion.provid,
    }); */
}
