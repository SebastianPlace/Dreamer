import DS from 'ember-data';

export default DS.Model.extend({
  habit: DS.belongsTo('habit'),
  //date: DS.attr('date')
  date: DS.attr(), //dateString
  // isCompleted: DS.attr('boolean')
});
