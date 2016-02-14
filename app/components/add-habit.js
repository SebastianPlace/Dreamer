import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['add-habit'],
  isValid: Ember.computed('title',function(){
    if(this.get('title')){
      return true;
    }
    return false;
  }),

  actions:{
    addHabit(){
      if(this.get('isValid')){
        let store = this.get('store');
        let goal = store.peekRecord('goal', this.get('id'));
        let habit = store.createRecord('habit', {
          goal: goal,
          title: this.get('title')
        });
        goal.get('habits').pushObject(habit);

        //TODO change to ES6 syntax
        let self = this;
        habit.save().then(function() {
          self.set('title','');
          return goal.save();
        });
      }
    }
  }
});
