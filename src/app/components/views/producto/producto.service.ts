import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from './producto';
import swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  baseUrl: String = environment.baseUrl;
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  findAll(): Observable<Producto[]> {
    const url = `${this.baseUrl}/prod/sel`;
    return this.http.get<Producto[]>(url);
  }

  create(producto: Producto): Observable<Producto> {
    const url = `${this.baseUrl}/prod/add`;
    return this.http.post<Producto>(url, producto);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }

  findById(prodid: number): Observable<Producto> {
    const url = `${this.baseUrl}/prod/sel/${prodid}`;
    return this.http.get<Producto>(url);
  }

  delete(prodid: number): Observable<void> {
    const url = `${this.baseUrl}/prod/del/${prodid}`;
    return this.http.delete<void>(url);
  }
  
  update(producto: Producto,prodid:number): Observable<void> {
    const url = `${this.baseUrl}/prod/upd/${prodid}`;
    return this.http.put<void>(url, producto);
  }

  filtrarProductos(term:string):Observable<Producto[]>{
    const url = `${this.baseUrl}/prod/sel/filtrar-productos/${term}`;
    return this.http.get<Producto[]>(url)
  }

  filtrarProductosByFecha(fechaini:string,fechafin:string):Observable<Producto[]>{
    const url = `${this.baseUrl}/prod/sel/${fechaini}/${fechafin}`;
    return this.http.get<Producto[]>(url)
  }

  subirFoto(archivo: File,prodid):Observable<Producto>{
    let formData = new FormData();
    formData.append("archivo",archivo);           
    formData.append("prodid",prodid);    
    return this.http.post(`${this.baseUrl}/prod/upload`,formData).pipe(
      map((response:any)=>response.producto as Producto),
      catchError(e=>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }
      )
    );       
  }

  
}
