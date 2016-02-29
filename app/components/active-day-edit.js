import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'a',
  classNameBindings: ['isActive:day-active'],
  click(){
    let activeDays = this.habit.get('activeDays');
    if(this.isActive){
      Ember.set(activeDays, this.day, false);
    }else{
      Ember.set(activeDays, this.day, true);
    }
  },
});
