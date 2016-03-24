import DS from 'ember-data';
//import Ember from 'ember';

export default DS.Model.extend({
  goal: DS.belongsTo('goal'),
  title: DS.attr('string'),
  dateCreated: DS.attr('date',{
    defaultValue() { return new Date(); }
  }),
  //days: DS.attr(),
  // days: DS.hasMany('day'),
  days: DS.attr('dates'),
  // activeDays: DS.attr(),
  // currentStreak: DS.attr('number'),
  //TODO move streak to streak component used in habit-card
  // streak:Ember.computed('days.@each', function(){
  //   return this.get('days');
  // }),
});
