import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Concepto } from './concepto.model';

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

  //obtener líneas
  listarLineas(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/concept/linea`;
    return this.http.get<Concepto[]>(url);
  }
  listarSubLineas(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/concept/sublinea`;
    return this.http.get<Concepto[]>(url);
  }
  listarUnidades(): Observable<Concepto[]> {
    const url = `${this.baseUrl}/concept/unidad`;
    return this.http.get<Concepto[]>(url);
  }
}
