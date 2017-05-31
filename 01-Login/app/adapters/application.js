import Ember from 'ember';
import DS from 'ember-data';

const {
  JSONAPIAdapter,
} = DS;

const {
  inject: {
    service,
  },
  get,
} = Ember;

export default JSONAPIAdapter.extend({
  auth: service(),
  namespace: 'api',
  headersForRequest() {
    const headers = this._super(...arguments);
    const {
      access_token
    } = get(this, 'auth').getSession();

    return Object.assign(headers, {
      'Authorization': `Bearer ${access_token}`
    });
  }
});
