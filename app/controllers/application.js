import Ember from 'ember';

export default Ember.Controller.extend({
  isSignupTabActive: true,
  actions:{
    setTab(value){
      this.set('isSignupTabActive', value);
    }
  }
});
