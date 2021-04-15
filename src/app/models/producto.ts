import { Categoria } from './categoria';
import { Marca } from './marca';
import { Proveedor } from './proveedor';

export class Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  stock: number;
  serie: number;  
  descripcion: string;
  indicaciones: string;
  foto: string;
  id_marca_pro: Marca;
  id_proveedor: Proveedor;
  id_categoria_pro: Categoria;
}
