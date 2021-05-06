import { Component, OnInit } from '@angular/core';
import { switchAll } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo:string='Por favor iniciar sesion';
  usuario: Usuario;
  constructor() {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
  }
  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password==null)
    {
      swal.fire('Error Login','Username o password vacias!', 'error');
      return;
    }
  }

}
