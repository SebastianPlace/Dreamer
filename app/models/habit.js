import DS from 'ember-data';

export default DS.Model.extend({
  goal: DS.belongsTo('goal'),
  title: DS.attr('string'),
  streak: DS.attr('number'),
  //could track streak start and streak end as dates
  //activeDays
});
