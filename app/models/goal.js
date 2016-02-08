import DS from 'ember-data';
import Ember from 'ember';

import { validator, buildValidations } from 'ember-cp-validations';
//TODO mkae validatons work, perhaps add code to templates
var Validations = buildValidations({
  title: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('length', {
        max: 15
      })
    ]
  },
});

export default DS.Model.extend(Validations, {
  title: DS.attr('string'),
  description: DS.attr('string'),
  dateCreated: DS.attr('date'),
  dateUpdated: DS.attr('date'),
  habits: DS.hasMany('habit')
});
