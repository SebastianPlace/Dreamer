import DS from 'ember-data';

export default DS.Model.extend({
  habit:DS.belongsTo('habit'),
  date: DS.attr(),
  isCompleted: DS.attr('boolean')
});
