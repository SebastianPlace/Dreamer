import DS from 'ember-data';
//import Ember from 'ember';

export default DS.Model.extend({
  goal: DS.belongsTo('goal'),
  title: DS.attr('string'),
  notes: DS.attr('string'),
  dateCreated: DS.attr('date',{
    defaultValue() { return new Date(); }
  }),
  days: DS.attr('dates'),
  activeDays: DS.attr(),
  calendarEvents: DS.hasMany('calendarEvent')
});
