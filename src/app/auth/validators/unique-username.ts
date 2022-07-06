import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl } from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import { of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) { }

    //to get access to 'this', we need to use arrow syntax for validate function
    validate = (control: AbstractControl) => {
        const { value } = control;
        return this.authService.validateusername(value).pipe(
            map(() => {
                return null;
            }),
            catchError((er) => {
                if (er.error.username) {
                    //of() operator is a shortcut for new Observable()
                    return of({ nonUniqueUsername: true })
                } else {
                    return of({ noConnection: true })
                }

                
            })
        )
    }
}
