import Ember from 'ember';

export default Ember.Component.extend({
  //define goal
  title:null,
  actions:{
    addGoal(){
      console.log(this.title);
      this.sendAction('createGoal',this.title);
    }
  }
});
