import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAll(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/cat/sel`;
    return this.http.get<Categoria[]>(url);
  }

  create(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/cat/add`;
    return this.http.post<Categoria>(url, categoria);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(catid: Number): Observable<Categoria> {
    const url = `${this.baseUrl}/cat/sel/${catid}`;
    return this.http.get<Categoria>(url);
  }

  delete(catid: Number): Observable<void> {
    const url = `${this.baseUrl}/cat/del/${catid}`;
    return this.http.delete<void>(url);
  }
  
  update(categoria: Categoria,catid:number): Observable<void> {
    const url = `${this.baseUrl}/cat/upd/${catid}`;
    return this.http.put<void>(url, categoria);
  }

  filtrarCategorias(term:string):Observable<Categoria[]>{
    const url = `${this.baseUrl}/cat/sel/filtrar-categorias/${term}`;
    return this.http.get<Categoria[]>(url)
  }
}
