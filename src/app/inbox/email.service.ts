import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailSummary, Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiUrl = 'https://api.angular-email.com/emails';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(this.apiUrl);
  }

  getEmail(id: string) {
    return this.http.get<Email>(this.apiUrl + '/' + id);
  }

  sendEmail(email: Email) {
    return this.http.post<Email>(this.apiUrl, email);
  }
}
