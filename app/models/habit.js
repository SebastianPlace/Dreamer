import DS from 'ember-data';

export default DS.Model.extend({
  goal: DS.belongsTo('goal'),
  title: DS.attr('string'),
  streak: DS.attr('number'),//can remove this and calculate it from daysCompleted
  //activeDays - Array
  //daysCompleted - Object list [{'23/07/15' : 'completed'},{...}]

  //could track streak start and streak end as dates
  //activeDays
});
