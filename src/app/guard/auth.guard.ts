import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
    let authenticationServie = inject(AuthService);
    let toastr = inject(ToastrService);
    let router = inject(Router);
    if (authenticationServie.isLoggedIn()) {
        router.navigate(['']) // home
        return true;
    } else {
        toastr.info("you are currently not logged in", "Oops");
        router.navigate(['login']);
        return false;
    }
}