import {AbstractControl} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let newPassword = AC.get('newPassword').value; // to get value in input tag
       let repeatePassword = AC.get('repeatePassword').value; // to get value in input tag
        if(newPassword != repeatePassword) {
            AC.get('repeatePassword').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}