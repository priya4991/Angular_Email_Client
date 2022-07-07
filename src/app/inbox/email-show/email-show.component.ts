import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs/operators';

// import { EmailService } from '../email.service';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;

  //ActivatedRoute tells the email show component why it is being displayed
  constructor(
    private route: ActivatedRoute
    // private emailService: EmailService
  ) {
    //the resolver first makes the network request before displaying this component on the screen 
    this.email = this.route.snapshot.data['email'];
    this.route.data.subscribe(data => {
      this.email = data['email'];
    })
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params['id']);
    
    // this solution of nested subscribes 
    // can start to break down if the network is slow or the user clicks on emails too fast
    // also, old requests dont get cancelled when new requests come in
    // this.route.params.subscribe(({ id }) => {
    //   this.emailService.getEmail(id).subscribe((email) => console.log(email));
    // });

    // switchMap will cancel old subscribes, and old issued requests will be cancelled too
    // this will prevent throttling when user clicks on emails rapidly or network is slow
    // this.route.params.pipe(
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe(email => {
    //   this.email = email;
    // });


    //new solution - get information from the RESOLVER in constructor

  }

}
