import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      for(let i=0; i< serialized.length; i++){
        serialized[i] = new Date(Ember.Date.parse(serialized[i]));
      }
    }
    console.log(serialized);
    return serialized;
  },
  serialize(deserialized) {
    //If present and is an array...
    if (deserialized && Object.prototype.toString.call( deserialized ) === '[object Array]') {
      for(let i=0; i< deserialized.length; i++){
        deserialized[i] = deserialized[i].toISOString();
      }
    }
    console.log(deserialized);
    return deserialized;
  }
});
