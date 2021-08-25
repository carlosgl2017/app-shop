import { Producto } from "../producto/producto";

export class Compra {
  compid:number;
  compbonificacion:number;
  compcant:number=1;
  compcodctrl:string;
  compconcepto:string;
  compdescuento:string;
  create_at:string;
  compfechaelaboracion:Date;
  compfechavencimiento:Date;
  compice:number;
  compimporte:number;
  compnrocajas:number;
  comppeso:number;
  comppesoneto:number;
  comppreciosubtotal:number;
  comppreciounitario:number;
  compprecioventa:number;
  compstockactual:number;
  compstockinicial:number;
  compum_impuesto:number;
  ctrllog:string;
  producto:Producto;

  public calcularImporte():number{
    return this.compcant*this.producto.prodprecioventa;
  }
}
