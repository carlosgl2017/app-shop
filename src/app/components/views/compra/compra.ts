import { Producto } from "../producto/producto";

export class Compra {
    compid : number;
    adqid :number;
    compbonificacion :number;
    compcodctrl :string;
    compconcepto :string;
    compdescuento :number;
    compfecha :Date;
    compice :number;    
    complotestock :number;
    compnrocajas :number;
    comppeso :number;
    comppesoneto :number;
    comppreciosubtotal :number;
    comppreciounitario :number;
    compum_impuesto :number;
    prodid :number;
    compimporte :number;
    compprecioventa :number;    
    compcant :number;
    compstockactual:number;
    compfechaelaboracion:Date;
    compfechavencimiento:Date;
    producto?:Producto;

}
