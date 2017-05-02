import Ember from 'ember';

const {
  Route,
  inject: {
    service,
  },
  get,
} = Ember;

export default Route.extend({
  auth: service(),
  beforeModel() {
      return get(this, 'auth')
        .handleAuthentication()
        // .then((success) =>  this.transitionTo('protected')));
  },
});
