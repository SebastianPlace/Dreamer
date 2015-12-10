import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    createGoal: function(){
      var goal = this.store.createRecord('goal',{
        title: this.title,
      });
      var _this = this;
      goal.save().then(function(){
        _this.set('title','');
      });
    }
  }
});
