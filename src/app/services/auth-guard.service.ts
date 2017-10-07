import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { ObjectStorage } from '../model/objectStorage';


// This class will serve as authentiction & authorization of application

@Injectable()
export class AuthGuard implements CanActivate {
    private objectStorage: ObjectStorage;

    constructor(private router: Router) {
        this.objectStorage = ObjectStorage.getInstance();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let signinUser = this.objectStorage.getUser_session();
        if (signinUser) {
            if (state.url.indexOf("/admin/") == 0 && (signinUser["admin"] || signinUser["canManageClientBridge"])) {
                return true;
            } else if (state.url.indexOf("/app/") == 0 && !(signinUser["admin"] || signinUser["canManageClientBridge"])) {
                return true;
            } else {
                // kick the user if he/she has no privilege
                this.kickUser();
            }
        }
        // not logged in so redirect to login page with the return url

        this.kickUser();
        return false;
    }

    private kickUser() {
        window.location.reload();
        this.router.navigate(['/login']);

    }
}
