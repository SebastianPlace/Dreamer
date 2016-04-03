import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row', 'habit-list'],

  actions:{
    addEvent(eventObject){
      this.get('addEvent')(eventObject);
    },
    deleteEvent(eventObject){
      this.get('deleteEvent')(eventObject);
    },
  }
});
