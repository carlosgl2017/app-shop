import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from './grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAll(): Observable<Grupo[]> {
    const url = `${this.baseUrl}/gru/sel`;
    return this.http.get<Grupo[]>(url);
  }
  create(grupo: Grupo): Observable<Grupo> {
    const url = `${this.baseUrl}/gru/add`;
    return this.http.post<Grupo>(url, grupo);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(id: Number): Observable<Grupo> {
    const url = `${this.baseUrl}/gru/sel/${id}`;
    return this.http.get<Grupo>(url);
  }

  delete(id: Number): Observable<void> {
    const url = `${this.baseUrl}/gru/del/${id}`;
    return this.http.delete<void>(url);
  }
  update(grupo: Grupo,gruid:number): Observable<void> {
    const url = `${this.baseUrl}/gru/upd/${gruid}`;
    return this.http.put<void>(url, grupo);
  }

}
