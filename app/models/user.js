import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  displayName: DS.attr('string'),
  goals: DS.hasMany('goal')
});
