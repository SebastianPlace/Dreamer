import Ember from 'ember';

export default Ember.Component.extend({
  //define goal
  store: Ember.inject.service(),
  title: null,
  classNames: ['add-goal'],
  actions:{
    addGoal(){
      var store = this.get('store');
      var goal = store.createRecord('goal',{
        title: this.title,
        dateCreated: new Date()
      });
      var self = this;
      goal.save().then(function(){
        self.set('title','');
      });
    }
  }
});
