import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //approach 1, use signedIn in template
  // signedIn = false;

  //approach 2, use signedin$ with async pipe in template
  signedin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private authService: AuthService) {
    //part of approach 2 
    this.signedin$ = this.authService.signedin$;
  }


  ngOnInit() {
    //part of approach 1
    //subscribing to observable from authService
    // this.authService.signedin$.subscribe(signedIn => {
    //   this.signedIn = signedIn
    // });

    this.authService.checkAuth().subscribe((res) => {});
  }
}
