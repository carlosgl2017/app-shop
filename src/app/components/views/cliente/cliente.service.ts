import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAll(): Observable<Cliente[]> {
    const url = `${this.baseUrl}/cli/sel`;
    return this.http.get<Cliente[]>(url);
  }

  create(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/cli/add`;
    return this.http.post<Cliente>(url, cliente);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(cliid: Number): Observable<Cliente> {
    const url = `${this.baseUrl}/cli/sel/${cliid}`;
    return this.http.get<Cliente>(url);
  }

  delete(cliid: Number): Observable<void> {
    const url = `${this.baseUrl}/con/del/${cliid}`;
    return this.http.delete<void>(url);
  }
  
  update(cliente: Cliente,cliid:number): Observable<void> {
    const url = `${this.baseUrl}/cli/upd/${cliid}`;
    return this.http.put<void>(url, cliente);
  }
}
