import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';

@Component({
  selector: 'app-grupo-delete',
  templateUrl: './grupo-delete.component.html',
  styleUrls: ['./grupo-delete.component.css']
})
export class GrupoDeleteComponent implements OnInit {
  grupo: Grupo = {
    grudescrip: ''
  }
  constructor(private service: GrupoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.grupo.gruid = this.route.snapshot.paramMap.get('gruid')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.grupo.gruid!).subscribe((respuesta) => {
      this.grupo.grudescrip = respuesta.grudescrip
    })
  }

  delete(): void {
    this.service.delete(this.grupo.gruid!).subscribe((respuesta) => {
      this.router.navigate(['grupos'])
      this.service.mensagem('Grupo eliminada con éxito!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void {
    this.router.navigate(['grupos'])
  }

}
