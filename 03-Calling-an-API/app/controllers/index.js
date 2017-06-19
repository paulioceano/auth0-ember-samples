import Ember from 'ember';

const {
  Controller,
  inject: {
    service,
  },
  get,
} = Ember;

export default Controller.extend({
  auth: service(),
  actions: {
    login() {
      get(this, 'auth').login();
    },
  },
});
