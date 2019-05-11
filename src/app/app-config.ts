interface IAuth0Config {
  clientID: string;
  domain: string;
  responseType: string;
  redirectUri: string;
  scope: string;
}

interface IAppConfig {
  APIEndpoint: string;
  Auth0Config: IAuth0Config;
}

export const AppConfig: IAppConfig = {
  APIEndpoint: 'http://localhost:3000/api',
  Auth0Config: {
    clientID: 'And6CEN5kGGDM71WtJ8i5ahkS4LNAkII',
    domain: 'gteirlinck.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  }
};
