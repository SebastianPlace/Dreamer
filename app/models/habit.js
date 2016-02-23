import DS from 'ember-data';
//import Ember from 'ember';

export default DS.Model.extend({
  goal: DS.belongsTo('goal'),
  title: DS.attr('string'),
  dateCreated: DS.attr('date',{
    defaultValue() { return new Date(); }
  }),
  days:DS.hasMany('day'),

  //TODO move streak to streak component used in habit-card
  // streak:Ember.computed('days.@each', function(){
  //   return this.get('days');
  // }),

  //repeat:
});
