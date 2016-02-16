import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['add-goal'],
  isValid: Ember.computed('title',function(){
    if(this.get('title')){
      return true;
    }
    return false;
  }),

  actions:{
    addGoal(){
      if(this.get('isValid')){
        let store = this.get('store');
        let goal = store.createRecord('goal',{
          title: this.title
        });
        let self = this;
        goal.save().then(function(){
          self.set('title','');
        });
      }
    }
  }
});
