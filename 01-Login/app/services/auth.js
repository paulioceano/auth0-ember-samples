import Ember from 'ember';
import config from 'auth0-ember-samples/config/environment';

const AUTH_CONFIG = config.auth0;

const {
  computed,
  Service,
  get,
  RSVP,
  isPresent,
} = Ember;

export default Service.extend({
  auth0: computed(function () {
    return new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid'
    });
  }),

  login() {
    get(this, 'auth0').authorize();
  },

  handleAuthentication() {
    return new RSVP.Promise((resolve, reject) => {
      get(this, 'auth0').parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        } else if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  },
  isAuthenticated: computed(function() {
    return isPresent(this.getSession().access_token) && this.isNotExpired();
  }).volatile(),
  getSession() {
    return {
      access_token: localStorage.getItem('access_token'),
      id_token: localStorage.getItem('id_token'),
      expires_at: localStorage.getItem('expires_at')
    };
  },

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
  },

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  },

  isNotExpired() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.getSession().expires_at;
    return new Date().getTime() < expiresAt;
  }
});
