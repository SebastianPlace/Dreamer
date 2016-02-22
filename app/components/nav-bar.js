import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  actions:{
    signOut(){
      this.sendAction('signOut');
    }
  }
});
