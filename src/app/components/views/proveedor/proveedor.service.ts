import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,private _snack: MatSnackBar ) { }
  findAll():Observable<Proveedor[]> {
    const url = `${this.baseUrl}/prov/sel`
    return this.http.get<Proveedor[]>(url)
  }
  findById(id: String): Observable<Proveedor> {
    const url = `${this.baseUrl}/prov/sel/${id}`
    return this.http.get<Proveedor>(url)
  }

  create(proveedor: Proveedor): Observable<Proveedor>{
    const url = `${this.baseUrl}/prov/add`
    return this.http.post<Proveedor>(url, proveedor);
  }

  delete(provid: String):Observable<void> {
    const url = `${this.baseUrl}/prov/del/${provid}`
    return this.http.delete<void>(url)
  }

  update(proveedor: Proveedor):Observable<void> {
    const url = `${this.baseUrl}/prov/upd/${proveedor.provid}`
    return this.http.put<void>(url, proveedor)
  }
  
  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
