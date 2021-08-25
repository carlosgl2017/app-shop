import { Compra } from "../compra/compra";
import { Proveedor } from "../proveedor/proveedor";
import { Usuario } from "../usuarios/usuario";

export class Adquisicion {
  adqid :number;
  adq_cod_control :string;
  adq_fec_fac_dui :Date;
  adq_nro_auto :number;
  adq_nro_dui :number;
  adq_nro_fact:number;
  adq_razon_social:string;
  adq_subtotal:number;
  adq_tipo_compra:number;
  adq_total_cred_fiscal:number;
  adq_total_desc_bonif_rebaja_al_iva :number;
  adq_total_importe_base_cred_fiscal:number;
  adq_total_importe_compra:number;
  adq_total_no_sujeto_cred_fiscal :number;
  adqcondicpago:string;
  adqdescrip :string;
  adqformapago :string;
  adqnotasalida:string;
  adqnro_pedido :string;
  adqobservaciones :string;
  adqreceptor :string;
  adqruta :string;
  adqtrasnporte :string;
  create_at:string;
  ctrllog:string;
  estado:string;
  compras:Array<Compra>=[];
  proveedor :Proveedor;
  usuario:Usuario;
  total:number;

  calcularGranTotal(): number {
    this.total = 0;
    this.compras.forEach((item: Compra) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
