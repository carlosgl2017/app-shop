import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concepto } from './concepto';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {
  baseUrl: String = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar,
    private router: Router
  ) { }

  findAll(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/con/sel`
    return this.http.get<Concepto[]>(url)
  }
  
  create(concepto: Concepto): Observable<Concepto> {
    const url = `${this.baseUrl}/con/add`
    return this.http.post<Concepto>(url, concepto);
  }
  
  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
  
  findById(id: String): Observable<Concepto> {
    const url = `${this.baseUrl}/con/sel/${id}`
    return this.http.get<Concepto>(url)
  }
  
  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/con/del/${id}`
    return this.http.delete<void>(url)
  }
  
  update(concepto: Concepto): Observable<void> {
    const url = `${this.baseUrl}/con/upd/${concepto.conid}`
    return this.http.put<void>(url, concepto)
  }

  //obtener líneas
  listarLineas(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/con/linea`;
    return this.http.get<Concepto[]>(url);
  }
  listarSubLineas(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/con/sublinea`;
    return this.http.get<Concepto[]>(url);
  }
  listarUnidades(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/con/unidad`;
    return this.http.get<Concepto[]>(url);
  }
}
