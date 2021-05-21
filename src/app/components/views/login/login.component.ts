import { Component, OnInit } from '@angular/core';
import { switchAll } from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo:string='Por favor iniciar sesion';
  usuario: Usuario;
  constructor(private authService:AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(){
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/']);
    }
  }
  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password==null)
    {
      swal.fire('Error Login','Username o password vacias!', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response=>{
      console.log(response);
      //let payload=JSON.parse(atob(response.access_token.split(".")[1]));
      // console.log(payload);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/']); 
      swal.fire('Login',`Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
    },err => {
      if(err.status == 400)
      {
        swal.fire('Error Login', 'Usuario o clave incorrecto!', 'error');
      }
    }
    );
  }

}
