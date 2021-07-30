import { NumberSymbol } from "@angular/common";
import { Compra } from "../compra/compra";
import { Producto } from "../producto/producto";

export class Entrega {
  entid:number;
  entcantidad:number=1;
  entprecioventa:number;
  createAt:string;  
  importe:number;
  producto:Producto;


  public calcularImporte():number{
    return this.entcantidad*this.producto.prodprecioventa;
  }

}
