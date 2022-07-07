import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Email } from './email';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');

        //we do not need to return a proper observable
        //because we dont need to show the email show component
        //hence we use EMPTY
        return EMPTY;
      })
    )
  }
}
