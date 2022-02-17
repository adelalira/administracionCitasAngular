import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from "rxjs";
import Swal from "sweetalert2";
import { AuthService } from "../auth/services/auth.service";





@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {
    constructor( private authService: AuthService,
        private router: Router ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let access=false;
        console.log('Can activate');
        
        return this.authService.validarToken()
        .pipe(
            map( resp => {
              console.log(resp);
              
              return true
            }),
            catchError( err => {
                console.log("ERROR AQUI")
                console.log(err);
                Swal.fire(  //devuelve el mensaje de la fakeAPi verificarToken
                    {
                    title: 'No acces',
                    text: 'Login to access this page',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  }
                  )
                  console.log("aqui estoy");
                
                this.router.navigateByUrl('/auth/login');
                return of(false)
            })
          )
          
    }

}