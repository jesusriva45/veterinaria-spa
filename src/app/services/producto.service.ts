import { Injectable } from '@angular/core';

import { Producto } from '../models/producto';

import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private urlEndPoint: string = 'http://localhost:8080/api/productos';
  private urlEndPoint2: string = 'http://localhost:8080/api/productosPrecio';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 
'Accept': 'application/json',
'Access-Control-Allow-Origin':'http://localhost:8080',
'Access-Control-Allow-Credentials': 'true',
'GET': 'POST'})

  constructor(private http: HttpClient) { }



  getProductos(): Observable<Producto[]>{
        //return of();
    //return this.http.get<Usuario[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Producto[])
    );
  }


  getProductoProPrecio(precioMin,precioMax): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint2}/${precioMin}/${precioMax}`)  
  }


  getProducto(id): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`)  
  }

  

}
