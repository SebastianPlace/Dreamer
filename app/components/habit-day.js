import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['day-circle'],
  classNameBindings: ['day.completed:complete:incomplete'],

  click(){
    console.log(this.habit.completed);
  }
});
