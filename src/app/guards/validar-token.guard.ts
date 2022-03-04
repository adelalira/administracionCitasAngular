import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from "rxjs";
import Swal from "sweetalert2";
import { AuthService } from "../auth/services/auth.service";





@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {

    /**
     * 
     * @param authService INYECTAMOS ROUTER Y AUTHSERVICE
     * @param router 
     */
    constructor( private authService: AuthService,
        private router: Router ){}


        /**
         * HACEMOS UN METODO CANACTIVATE QUE COMPRUEBA SI EL TOKEN DEL USUARIO SIGUE SIENDO VALIDO, ESTO HARA QUE 
         * POR EJEMPLO SI NO SE HA INICIADO SESIÓN O SE HAYA CERRADO SESIÓN NO SE PUEDA ACCEDER A LA ZONA
         * PRIVADA DE USUARIO
         * @param route 
         * @param state 
         * @returns 
         */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let access=false;
        return this.authService.validarToken()
        .pipe(
            map( resp => {
              
              return true
            }),
            catchError( err => {
                console.log("ERROR AQUI")
                console.log(err);
                Swal.fire(  
                    {
                    title: 'No access',
                    text: 'Login to access this page',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  }
                  )
                
                this.router.navigateByUrl('/auth/login');
                return of(false)
            })
          )
          
    }

}