import DS from 'ember-data';

export default DS.Model.extend({
  habit: DS.belongsTo('habit'),
  //computed property, takes title from habit.
  title: DS.attr('string'),//summary
  //computed notes from habit, to prevent passing too much around
  description: DS.attr('string'),//description
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),

  //this is the ID sent back on successful event insertion
  //use this to edit or delete events
  //eventId: DS.attr()

  //**optional** currently default
  //reminder: DS.attr('number') //number of minutes before startTime
});
