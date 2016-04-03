import DS from 'ember-data';

export default DS.Model.extend({
  habit: DS.belongsTo('habit'),
  eventId: DS.attr('string'), //id returned when event is created
  //computed property, takes title from habit.
  title: DS.attr('string'),//summary
  //computed notes from habit, to prevent passing too much around
  description: DS.attr('string'),//description
  startAt: DS.attr('date'),
  endAt: DS.attr('date'),
  //**optional** currently default
  //reminder: DS.attr('number') //number of minutes before startTime
});
