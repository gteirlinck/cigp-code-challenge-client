import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _idToken = '';
  private _accessToken = '';
  private _expiresAt = 0;
  private _userID: string = null;

  auth0 = new auth0.WebAuth({
    clientID: AppConfig.Auth0Config.clientID,
    domain: AppConfig.Auth0Config.domain,
    responseType: AppConfig.Auth0Config.responseType,
    redirectUri: AppConfig.Auth0Config.redirectUri,
    scope: AppConfig.Auth0Config.scope
  });

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get userID(): string {
    return this._userID;
  }

  constructor(private router: Router) {}

  login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this._userID = authResult.idTokenPayload.sub;
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['']);
      } else if (err) {
        this.router.navigate(['']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = authResult.expiresIn * 1000 + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;

    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this._accessToken && Date.now() < this._expiresAt;
  }
}
