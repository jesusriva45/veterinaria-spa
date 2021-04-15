import { Injectable } from '@angular/core';

import { Producto } from '../models/producto';

import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor';
import { Categoria } from '../models/categoria';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/productos';



  private urlEndPoint2: string = 'http://localhost:8080/api/productosPrecio';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true',
    GET: 'POST',
  });

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    //return of();
    //return this.http.get<Usuario[]>(this.urlEndPoint);
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Producto[]));
  }

  insert(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, producto, {
      headers: this.httpHeaders,
    });
  }

  update(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.urlEndPoint}/${producto.id_producto}`,
      producto,
      { headers: this.httpHeaders }
    );
  }

  delete(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  getProductoProPrecio(precioMin, precioMax): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.urlEndPoint2}/${precioMin}/${precioMax}`
    );
  }
  getProducto(id): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }

  getMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.urlEndPoint}/marca`);
  }

  getProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.urlEndPoint}/proveedor`);
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.urlEndPoint}/categoria`);
  }
}
