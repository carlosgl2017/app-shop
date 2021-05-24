import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../../usuarios/auth.service';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-read',
  templateUrl: './producto-read.component.html',
  styleUrls: ['./producto-read.component.css']
})
export class ProductoReadComponent implements OnInit {
  productos: Producto[] = []; 
  displayedColumns: string[] = ["prodid", "catid", "proddescrip", "prodestado","prodprecioventa","acciones"];

 
 
  constructor(
    private service: ProductoService, 
    private router: Router,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.findAll();  
   
  }

  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.productos = respuesta;
    });
  }

  navegarParaProductoCreate() {
    this.router.navigate(["productos/create"])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.productos.filter= filterValue.trim().toLowerCase();
  }

}
