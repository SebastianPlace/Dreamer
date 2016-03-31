import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
  afterModel(){
    if(this.get('session').get('isAuthenticated')){
      this.transitionTo('goals');
    }
  },
  //TODO catch errors
  //TODO move calendar init to here and call it if signin is success
  actions: {
    signIn: function(provider) {
      this.get("session").open("firebase", { provider: provider}).then((data)=>{
        this.store.query('user', { filter: { uid: data.currentUser.id }}).then((existing)=>{
          const user = existing.objectAt(0);
          if(!user){
            this.store.createRecord('user',{
              uid: data.currentUser.id,
              displayName: data.currentUser.displayName
            }).save();
          }
        });
        this.transitionTo('goals');
      });
    },
    signOut: function() {
      this.get("session").close();
      this.transitionTo('/');
    },
  }
});
