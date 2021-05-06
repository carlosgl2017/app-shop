import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../proveedor.model';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-update',
  templateUrl: './proveedor-update.component.html',
  styleUrls: ['./proveedor-update.component.css']
})
export class ProveedorUpdateComponent implements OnInit {

  proveedor: Proveedor = {
    provid: '',
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

  constructor(
    private service: ProveedorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proveedor.provid = this.route.snapshot.paramMap.get("provid")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.proveedor.provid!).subscribe((resposta) => {

       this.proveedor.provempresa = resposta.provempresa
      this.proveedor.provnombre = resposta.provnombre
      this.proveedor.provmaterno = resposta.provmaterno
      this.proveedor.provpaterno = resposta.provpaterno
      this.proveedor.provcinit = resposta.provcinit
      this.proveedor.provdepto = resposta.provdepto
      this.proveedor.provlugar = resposta.provlugar
      this.proveedor.provdirec = resposta.provdirec
      this.proveedor.provemail = resposta.provemail
      this.proveedor.provtelef = resposta.provtelef
      this.proveedor.provfax = resposta.provfax
      this.proveedor.provestado = resposta.provestado
      this.proveedor.provtipo = resposta.provtipo
      this.proveedor.provurl = resposta.provurl
      this.proveedor.ctrllog = resposta.ctrllog
    });
  }

  update(): void {
    this.service.update(this.proveedor).subscribe((resposta) => {
      this.router.navigate(["proveedores"]);
      this.service.mensagem("--> proveedores se actualizó con éxito");
    }, err => {
      this.service.mensagem('Validar que todos los campos esten llenados corretamente!')
    });
  }

  cancel(): void {
    this.router.navigate(['proveedores'])
  }
}
