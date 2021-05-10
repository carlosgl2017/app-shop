import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../usuarios/auth.service';
import swal from 'sweetalert2'; 
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(!this.authService.isAuthenticated())
      {
        this.router.navigate(['/login']);
        return false;
      }
      let role= route.data['role'] as string;
    console.log(role);
    if(this.authService.hasRole(role))
    {
      return true;
    }
    swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/productos']);
      return false;
  }
  
}
