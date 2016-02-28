import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  dateCreated: DS.attr('date',{
    defaultValue() { return new Date(); }
  }),
  dateUpdated: DS.attr('date'),
  habits: DS.hasMany('habit'),
  steps: DS.hasMany('step'),
  user: DS.belongsTo('user')
});
