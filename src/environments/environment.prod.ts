export const environment = {
  production: true,
  APIEndpoint: 'https://cigp-api.azurewebsites.net/api',
  Auth0Config: {
    clientID: 'And6CEN5kGGDM71WtJ8i5ahkS4LNAkII',
    domain: 'gteirlinck.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://cigpclient.z7.web.core.windows.net/callback',
    scope: 'openid profile',
    audience: 'https://cigp.api'
  }
};
