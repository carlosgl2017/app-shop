import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from '../proveedor.model';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css']
})
export class ProveedorCreateComponent implements OnInit {

  proveedor: Proveedor = {
    provempresa: '',
    provnombre: '',
    provmaterno: '',
    provpaterno: '',
    provcinit: '',
    provdepto: '',
    provlugar: '',
    provdirec: '',
    provemail: '',
    provtelef: '',
    provfax: '',
    provestado: '',
    provtipo: '',
    provurl: '',
    ctrllog: ''
  }
  constructor(private service: ProveedorService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.proveedor).subscribe((resposta) => {
      this.router.navigate(['proveedores'])
      this.service.mensagem('.... Proveedor registrado con exito!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['proveedor'])
  }
}
