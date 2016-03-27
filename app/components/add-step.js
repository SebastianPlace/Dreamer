import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  classNames: ['add-item'],
  isValid: Ember.computed('title',function(){
    if(this.get('title')){
      return true;
    }
    return false;
  }),

  actions:{
    addStep(){
      const flashMessages = Ember.get(this, 'flashMessages');
      if(this.get('isValid')){
        const store = this.get('store');
        const goal = store.peekRecord('goal', this.get('goalId'));
        const step = store.createRecord('step', {
          goal: goal,
          title: this.get('title')
        });
        goal.get('steps').pushObject(step);
        step.save()
        .then(()=>{
          this.set('title','');
          goal.save();
        }).catch((err)=>{
          flashMessages.danger('Whoops. Your step could not be created.');
          console.error(err);
        });
      }
    }
  }
});
