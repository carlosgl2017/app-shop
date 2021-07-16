import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from './proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAll(): Observable<Proveedor[]> {
    const url = `${this.baseUrl}/prov/sel`;
    return this.http.get<Proveedor[]>(url);
  }

  create(proveedor: Proveedor): Observable<Proveedor> {
    const url = `${this.baseUrl}/prov/add`;
    return this.http.post<Proveedor>(url, proveedor);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(id: Number): Observable<Proveedor> {
    const url = `${this.baseUrl}/prov/sel/${id}`;
    return this.http.get<Proveedor>(url);
  }

  delete(id: Number): Observable<void> {
    const url = `${this.baseUrl}/prov/del/${id}`;
    return this.http.delete<void>(url);
  }
  update(proveedor: Proveedor,provid:number): Observable<void> {
    const url = `${this.baseUrl}/prov/upd/${provid}`;
    return this.http.put<void>(url, proveedor);
  }
  filtrarProveedores(term:string):Observable<Proveedor[]>{
    const url = `${this.baseUrl}/prov/sel/filtrar-proveedores/${term}`;
    return this.http.get<Proveedor[]>(url)
  }
}
