import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['add-item'],
  isValid: Ember.computed('title',function(){
    if(this.get('title')){
      return true;
    }
    return false;
  }),

  actions:{
    addHabit(){
      if(this.get('isValid')){
        const store = this.get('store');
        const goal = store.peekRecord('goal', this.get('goalId'));
        const activeDays = {
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: true,
          sun: true
        };
        const habit = store.createRecord('habit', {
          goal: goal,
          title: this.get('title'),
          activeDays: activeDays
        });
        goal.get('habits').pushObject(habit);
        habit.save().then(()=>{
          this.set('title','');
          return goal.save();
        });
      }
    }
  }
});
