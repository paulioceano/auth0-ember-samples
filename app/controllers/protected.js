import Ember from 'ember';
import moment from 'moment';

const {
  Controller,
  inject: {
    service,
  },
  computed,
  computed: {
    alias,
  },
  get,
} = Ember;

export default Controller.extend({
  auth: service(),
  posts: alias('model'),
  actions: {
    logout() {
      get(this, 'auth').logout();
      this.transitionToRoute('index');
    }
  }
});
