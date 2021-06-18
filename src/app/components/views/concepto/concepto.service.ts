import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concepto } from './concepto';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAll(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/con/sel`;
    return this.http.get<Concepto[]>(url);
  }

  create(concepto: Concepto): Observable<Concepto> {
    const url = `${this.baseUrl}/con/add`;
    return this.http.post<Concepto>(url, concepto);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(id: Number): Observable<Concepto> {
    const url = `${this.baseUrl}/con/sel/${id}`;
    return this.http.get<Concepto>(url);
  }

  delete(id: Number): Observable<void> {
    const url = `${this.baseUrl}/con/del/${id}`;
    return this.http.delete<void>(url);
  }
  update(concepto: Concepto,conid:number): Observable<void> {
    const url = `${this.baseUrl}/con/upd/${conid}`;
    return this.http.put<void>(url, concepto);
  }
}
