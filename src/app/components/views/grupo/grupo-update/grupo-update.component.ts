import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';
@Component({
  selector: 'app-grupo-update',
  templateUrl: './grupo-update.component.html',
  styleUrls: ['./grupo-update.component.css']
})
export class GrupoUpdateComponent implements OnInit {
  grupo: Grupo = {
  //  gruid: '',
    grudescrip: ''
  };
  constructor(
    private service: GrupoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.grupo.gruid = this.route.snapshot.paramMap.get('gruid')!;
    this.findById();
  }
  findById(): void {
    this.service.findById(this.grupo.gruid!).subscribe((respuesta) => {
      this.grupo.grudescrip = respuesta.grudescrip;
    });
  }
  update(): void {
    this.service.update(this.grupo).subscribe((respuesta) => {
      this.router.navigate(['grupos']);
      this.service.mensagem('-->Grupo actualizado con éxito');
    }, err => {
      this.service.mensagem('Debe llenar todos los campos!')
    });
  }

  cancel(): void {
    this.router.navigate(['grupos'])
  }



}
