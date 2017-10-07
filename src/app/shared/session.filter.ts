import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
import {ObjectStorage } from '../model/objectStorage'

export class SessionFilter {

        protected objectStorage:ObjectStorage;

        constructor(protected router: Router) {
                this.objectStorage = ObjectStorage.getInstance();
                if (this.objectStorage.getUser_session().code) {
                        window.location.reload();
                        this.router.navigate(["\login"]);
                }
        }
}