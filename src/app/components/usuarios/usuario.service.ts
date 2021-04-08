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

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})



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
}
