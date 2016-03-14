import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {
    // if (serialized) {
    //   for(let i=0; i< serialized.length; i++){
    //     serialized[i] = new Date(Ember.Date.parse(serialized[i]));
    //   }
    // }
    // console.log(serialized);
    return serialized;
  },

  serialize(deserialized) {
    // if (deserialized) {
    //   for(let i=0; i< deserialized.length; i++){
    //     deserialized[i] = deserialized[i].toISOString();
    //   }
    // }
    return deserialized;
  }
});
