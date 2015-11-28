import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  dateCreated: DS.attr('date'),
  dateUpdated: DS.attr('date'),
});