import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Categoria } from "../categoria/categoria";
import { Producto } from "./producto";
import { catchError, map } from 'rxjs/operators'
import { AuthService } from "../usuarios/auth.service";
import swal from 'sweetalert2';
@Injectable({
  providedIn: "root",
})
export class ProductoService {
  baseUrl: String = environment.baseUrl;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http: HttpClient,
    private _snack: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  //login
  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/productos']);
      return true;
    }
    return false;
  } 

 findAll(): Observable<Producto[]> {
    const url = `${this.baseUrl}/prod/sel`;
    return this.http.get<Producto[]>(url,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  } 
  //obtener categorias
  findAllCategorias(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/cat/sel`;
    return this.http.get<Categoria[]>(url);
  }

  //

  findById(id: String): Observable<Producto> {
    const url = `${this.baseUrl}/prod/sel/${id}`;
    return this.http.get<Producto>(url, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        this.router.navigate(['/productos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
 
  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/prod/del/${id}`;
    return this.http.delete<void>(url,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  

  create(producto: Producto): Observable<Producto> {
    const url = `${this.baseUrl}/prod/add`;
    return this.http.post<Producto>(url, producto, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.cliente as Producto),
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  update(producto: Producto): Observable<void> {
    const url = `${this.baseUrl}/prod/upd/${producto.prodid}`;
    return this.http.put<void>(url, producto,{ headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  mensagem(str: String): void {
    this._snack.open(`${str}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000,
    });
  }
}
