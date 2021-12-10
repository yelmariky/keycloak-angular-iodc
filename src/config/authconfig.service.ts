import { Injectable } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthConfigService {
    
    private _decodedAccessToken: any;
    private _decodedIDToken: any;
    get decodedAccessToken() { return this._decodedAccessToken; }
    get decodedIDToken() { return this._decodedIDToken; }

    constructor(
      private readonly oauthService: OAuthService,
      private readonly authConfig: AuthConfig
    ) {}

    async initAuth(): Promise<any> {
      return new Promise((resolveFn, rejectFn) => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);
        this.oauthService.setStorage(localStorage);
        let strEmail = localStorage.getItem("id_token_claims_obj");
        let email='';
        if (strEmail !=null) {
          email=JSON.parse(strEmail).email;
        }
        //let email = !=null?JSON.parse(localStorage.getItem("id_token_claims_obj")).email:"";
        console.log("** younes email: "+email);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
  
        // subscribe to token events
        this.oauthService.events
          .pipe(filter((e: any) => {
            return e.type === 'token_received';
          }))
          .subscribe(() => this.handleNewToken());
        // disabling keycloak for now
         // resolveFn();
        // continue initializing app or redirect to login-page
        
        this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
          if (isLoggedIn) {
            this.oauthService.setupAutomaticSilentRefresh();
            resolveFn(null);
          } else {
            this.oauthService.initImplicitFlow();
            rejectFn();
          }
        });
        
      });
    }
  
    private handleNewToken() {
      this._decodedAccessToken = this.oauthService.getAccessToken();
      this._decodedIDToken = this.oauthService.getIdToken();
    }

    public getAccessToken(){
      return this.oauthService.getAccessToken();
    }

}
