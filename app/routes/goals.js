import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
   return Ember.$.getScript('https://apis.google.com/js/client.js');
  },
  model() {
    const currentUserGoogleId = this.get('session.currentUser.id');
    const currentUserId = this.store.query('user', { filter: { uid:currentUserGoogleId  }});
    return Ember.RSVP.hash({
      goals: currentUserId.then((user) =>{
        return this.store.query('goal', {orderBy: 'user', equalTo: user.objectAt(0).id });
      },(reason) =>{
        console.error(reason);
      })
    });
  },
});
