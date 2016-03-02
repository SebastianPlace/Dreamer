import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['day-circle'],
  classNameBindings: ['day.isCompleted:complete:incomplete'],
  isToday: Ember.computed('this.day',{

  }),
  click(){
    console.log(this.day.get('isCompleted'));
  }

});
