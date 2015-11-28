import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    addGoal(string name){
      console.log("component action working");
    }
  }
});
