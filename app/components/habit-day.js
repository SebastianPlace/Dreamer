import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['day-circle'],
  classNameBindings: ['day.isCompleted:complete:incomplete'],
  click(){
    console.log(this.day.get('isCompleted'));
  }

});
