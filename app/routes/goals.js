import Ember from 'ember';

export default Ember.Route.extend({
  //TODO: http://stackoverflow.com/questions/33717667/manage-ember-multiple-rsvp-promises-on-the-same-route
  model() {
    // const currentUserId = this.get('session.currentUser.id');
    // this.store.query('user', { filter: { uid:currentUserId  }}).then((user)=>{
    //   return this.store.query('goal', {orderBy: 'user', equalTo: user.objectAt(0).id });
    // });
    return this.store.findAll('goal');



  },
});
