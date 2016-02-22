import Ember from 'ember';

export default Ember.Route.extend({
  //TODO find only the goals that belong to the current user
  model() {
    return this.store.findAll('goal');
  },
});
