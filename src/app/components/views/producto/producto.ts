import { Categoria } from "../categoria/categoria";
import { Compra } from "../compra/compra";

export class Producto {
    prodid?: number;
    codigobarra?:string;
    ctrllog?:string;    
    prodestado?: string;
    prodfreg?: Date;    
    prodimagtxt?:string;
    prodnombre : string;  
    proddescrip: string;
    prodprecioventa: number;
    categoria?:Categoria;  //relacion con la tabla categoria  
    compra?:Compra;
}
