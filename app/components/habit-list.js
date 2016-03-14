import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'habit-list'],
  actions:{
    logDay(isCompleted, habit){
      this.get('logDay')(isCompleted, habit);
    },
  }
});
