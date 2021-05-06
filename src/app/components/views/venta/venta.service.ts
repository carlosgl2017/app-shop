import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Venta } from './venta.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,private _snack: MatSnackBar ) { }
  findAll():Observable<Venta[]> {
    const url = `${this.baseUrl}/vent/sel`
    return this.http.get<Venta[]>(url)
  }
  findById(id: String): Observable<Venta> {
    const url = `${this.baseUrl}/vent/sel/${id}`
    return this.http.get<Venta>(url)
  }

  create(venta: Venta): Observable<Venta>{
    const url = `${this.baseUrl}/vent/add`
    return this.http.post<Venta>(url, venta);
  }

  delete(venid: String):Observable<void> {
    const url = `${this.baseUrl}/vent/del/${venid}`
    return this.http.delete<void>(url)
  }

  update(venta: Venta):Observable<void> {
    const url = `${this.baseUrl}/vent/upd/${venta.venid}`
    return this.http.put<void>(url, venta)
  }
  
  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }


}
