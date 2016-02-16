import DS from 'ember-data';

export default DS.Model.extend({
  habit:DS.belongsTo('habit'),
  date: DS.attr('date',{
    defaultValue() { return new Date(); }
  }),
  completed: DS.attr('boolean')
});
