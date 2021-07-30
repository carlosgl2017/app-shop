import { Venta } from "../venta/venta";

export class Cliente {
  cliid? :number;
  apellidos:string;
  direccion:string;
  email:string;
  fechanacimiento : Date;
  nombre:string;
  numero_doc:string;
  sexo:string;
  telefono:string;
  tipo_documento:string;
  ventas?:Venta[]=[];
}
