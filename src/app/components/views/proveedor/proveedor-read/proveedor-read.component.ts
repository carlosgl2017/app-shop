import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from '../proveedor.model';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-read',
  templateUrl: './proveedor-read.component.html',
  styleUrls: ['./proveedor-read.component.css']
})
export class ProveedorReadComponent implements OnInit {

  proveedores: Proveedor[] = [];
  displayedColumns: string[] = ["provid","provempresa","provnombre","provmaterno","provpaterno","provcinit","provdepto","provlugar","provdirec","provemail","provtelef","provfax","provestado","provtipo","provurl","ctrllog","acciones"];
  constructor(private service: ProveedorService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }
  
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.proveedores = respuesta;
    });
  }

  navegarParaProveedorCreate() {
    this.router.navigate(["proveedor/create"])
  }

}
