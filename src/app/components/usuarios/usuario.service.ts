import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json', 
'Accept': 'application/json',
'Access-Control-Allow-Origin':'http://localhost:8080',
'Access-Control-Allow-Credentials': 'true',
'GET': 'POST'})



  


  constructor(private http: HttpClient) { }


  getUsuarios(): Observable<Usuario[]>{
    //return of();

    //return this.http.get<Usuario[]>(this.urlEndPoint);

    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Usuario[])
    );
  }

  insert(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint, usuario ,{headers : this.httpHeaders})    
  }


  getUsuario(id): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`)  
  }

  
  delete(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers : this.httpHeaders})  
  }







}