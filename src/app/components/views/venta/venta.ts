import { Cliente } from "../cliente/cliente";
import { Entrega } from "../entrega/entrega";

export class Venta {
  venid:number;
  create_at:Date;
  ctrllog:Date;
  ven_estado:string;
  ven_fec_factura:Date;
  ven_nro_auto:number;
  ven_nro_fact:number;
  venestado:string;
  descripcion:string;
  cliente_id:number;
  user_id:number;
  entregas:Array<Entrega>=[];
  cliente:Cliente;
  total:number;
  createAt:string;
  observacion:string;

  calcularGranTotal(): number {
    this.total = 0;
    this.entregas.forEach((item: Entrega) => {
      this.total += item.calcularImporte();
    });
    return this.total;
  }
}
