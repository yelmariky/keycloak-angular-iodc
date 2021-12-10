import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    <h1 *ngIf="!name">
    Hallo
</h1>
<h1 *ngIf="name">
    Hallo, {{name}}
</h1>
    <button class="btn btn-default" (click)="login()">
  Login
</button>
<button class="btn btn-default" (click)="logoff()">
  Logout
</button>
      <h1>{{ title }}</h1>
      <app-habit-list></app-habit-list>
    </div>
  `,
  styles: ['h1 { color: blue }'],
})
export class AppComponent {
  title = 'Habit Tracker';
  constructor(private oauthService: OAuthService) {
  }
  public login() {
    this.oauthService.initLoginFlow();
}

public logoff() {
    this.oauthService.logOut();
}

public get name() {
    let claims:any = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims.given_name;
}
}
