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
  actions: {
    signIn: function(provider) {
      this.get("session").open("firebase", { provider: provider}).then((data)=>{
        console.log(data.currentUser);
        this.transitionTo('goals');
      });
    },
    signOut: function() {
      this.get("session").close();
      this.transitionTo('/');
    },
  }
});
