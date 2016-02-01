import Ember from 'ember';

export default Ember.Component.extend({
  //define goal
  store: Ember.inject.service(),
  title: null,
  actions:{
    // addGoal(){
    //   this.sendAction('createGoal',this.title);
    // }
    addGoal(){
      var store = this.get('store');
      var goal = store.createRecord('goal',{
        title:this.title,
      });
      var self = this;
      goal.save().then(function(){
        self.set('title','');
      });
    }
  }
});
