import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
@Component({
  selector: 'app-grupo-read',
  templateUrl: './grupo-read.component.html',
  styleUrls: ['./grupo-read.component.css']
})
export class GrupoReadComponent implements OnInit {
  grupos: Grupo[] = [];
  displayedColumns: string[] = ["gruid", "grudescrip", "acciones"];
  constructor(private service: GrupoService, private router: Router) { }
  ngOnInit(): void {
    this.findAll();
  }
  findAll() {
    this.service.findAll().subscribe((respuesta) => {
      console.log(respuesta);
      this.grupos = respuesta;
    });
  }

  navegarParaGruposCreate() {
    this.router.navigate(["grupos/create"])
  }

}
