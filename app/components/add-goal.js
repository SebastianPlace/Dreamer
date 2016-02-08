import Ember from 'ember';

export default Ember.Component.extend({
  //define goal
  store: Ember.inject.service(),
  title: null,
  classNames: ['add-goal'],
  actions:{
    addGoal(){
      let store = this.get('store');
      let goal = store.createRecord('goal',{
        title: this.title,
        dateCreated: new Date()
      });
      let self = this;
      goal.save().then(function(){
        self.set('title','');
      });
    }
  }
});
