import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compra } from './compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}
 
  findAll(): Observable<Compra[]> {
    const url = `${this.baseUrl}/comp/sel`;
    return this.http.get<Compra[]>(url);
  }

  create(compra: Compra): Observable<Compra> {
    const url = `${this.baseUrl}/comp/add`;
    return this.http.post<Compra>(url, compra);
  }
  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(id: Number): Observable<Compra> {
    const url = `${this.baseUrl}/comp/sel/${id}`;
    return this.http.get<Compra>(url);
  }

  delete(id: Number): Observable<void> {
    const url = `${this.baseUrl}/comp/del/${id}`;
    return this.http.delete<void>(url);
  }
  update(compra: Compra): Observable<void> {
    const url = `${this.baseUrl}/comp/upd/${compra.compid}`;
    return this.http.put<void>(url, compra);
  }
}
