import { Component } from '@angular/core';
import { Router } from '@angular/router';

export class SessionFilter {

        
        constructor(protected router: Router) {
                if (!sessionStorage.getItem("user_token") && !sessionStorage.getItem("signin_user")) {
                        this.router.navigate(["\login"]);

                }
        }
}