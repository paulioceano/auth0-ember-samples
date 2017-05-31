import Ember from 'ember';

const {
  Route,
  Logger,
  inject: {
    service,
  },
  get,
} = Ember;

export default Route.extend({
  auth: service(),
  beforeModel() {
    if (!get(this, 'auth.isAuthenticated')) {
      return this.replaceWith('application');
    }
  },
  model() {
    return this.store.findAll('post').catch((err) => {
      Logger.error(err);
    });
  }
});
