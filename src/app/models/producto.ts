import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";

export class Producto {

 
	id_producto: number;
    nombre:string;	
	precio:number;	
	stock:number;
	serie:number;
	marca:string;	
	descripcion:string;
	indicaciones:string;
	foto:string;
	id_proveedor:Proveedor;	
	id_categoria_pro:Categoria;	

}
