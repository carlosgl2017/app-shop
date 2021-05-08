import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';

@Component({
  selector: 'app-grupo-create',
  templateUrl: './grupo-create.component.html',
  styleUrls: ['./grupo-create.component.css']
})
export class GrupoCreateComponent implements OnInit {

  grupo: Grupo = {
    grudescrip: ''
  }

  constructor(private service: GrupoService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.grupo).subscribe((respuesta) => {
      this.router.navigate(['grupos'])
      this.service.mensagem('-->Grupo creada con éxito!');
    }, err => {
      for (let i = 0; i < err.error.errors.length; i++) {
        this.service.mensagem(err.error.errors[i].message)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['grupos'])
  }

}