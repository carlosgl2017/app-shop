import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adquisicion } from './adquisicion';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {


  baseUrl: String = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar
  ) { }

  findAll(): Observable<Adquisicion[]> {
    const url = `${this.baseUrl}/adq/sel`;
    return this.http.get<Adquisicion[]>(url);
  }
  /* create(venta: Venta): Observable<Venta> {
    const url = `${this.baseUrl}/vent/add`;
    return this.http.post<Venta>(url, venta);
  } */
  create(adquisicion: Adquisicion): Observable<Adquisicion> {
    const url = `${this.baseUrl}/adq/add`;
    return this.http.post<Adquisicion>(url, adquisicion);
  }
  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }
  findById(adqid: number): Observable<Adquisicion> {
    const url = `${this.baseUrl}/adq/sel/${adqid}`;
    return this.http.get<Adquisicion>(url);
  }

  delete(adqid: number): Observable<void> {
    const url = `${this.baseUrl}/adq/del/${adqid}`;
    return this.http.delete<void>(url);
  }
  
  update(adquisicion: Adquisicion,adqid:number): Observable<void> {
    const url = `${this.baseUrl}/adq/upd/${adqid}`;
    return this.http.put<void>(url, adquisicion);
  }
}
