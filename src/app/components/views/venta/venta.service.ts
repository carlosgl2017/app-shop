import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from './venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  baseUrl: String = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar
  ) { }

  findAll(): Observable<Venta[]> {
    const url = `${this.baseUrl}/vent/sel`;
    return this.http.get<Venta[]>(url);
  }


  /* create(venta: Venta): Observable<Venta> {
    const url = `${this.baseUrl}/vent/add`;
    return this.http.post<Venta>(url, venta);
  } */
  create(factura: Venta): Observable<Venta> {
    const url = `${this.baseUrl}/vent/add`;
    return this.http.post<Venta>(url, factura);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(venid: number): Observable<Venta> {
    const url = `${this.baseUrl}/vent/sel/${venid}`;
    return this.http.get<Venta>(url);
  }

  delete(venid: number): Observable<void> {
    const url = `${this.baseUrl}/vent/del/${venid}`;
    return this.http.delete<void>(url);
  }
  
  update(venta: Venta,venid:number): Observable<void> {
    const url = `${this.baseUrl}/vent/upd/${venid}`;
    return this.http.put<void>(url, venta);
  }

}
