import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['add-habit'],

  actions:{
    addHabit(){
      let store = this.get('store');
      let goal = store.peekRecord('goal', this.get('id'));
      let habit = store.createRecord('habit', {
        goal:goal,
        title: this.get('title')
      });
      goal.get('habits').pushObject(habit);
      let self = this;
      habit.save().then(function() {
        self.set('title','');
        return goal.save();
      });
    }
  }
});
