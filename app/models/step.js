import DS from 'ember-data';

export default DS.Model.extend({
  goal: DS.belongsTo('goal'),
  title: DS.attr('string'),
  isDone: DS.attr('boolean'),
});
