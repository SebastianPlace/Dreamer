import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  classNames: ['add-goal'],
  isValid: Ember.computed('title',function(){
    if(this.get('title')){
      return true;
    }
    return false;
  }),

  actions:{
    addGoal(){
      const store = this.get('store');
      const currentUserId = this.get('session.currentUser.id');
      const flashMessages = Ember.get(this, 'flashMessages');

      store.query('user', { filter: { uid:currentUserId  }}).then((user)=>{
        if(this.get('isValid')){
          const goal = store.createRecord('goal',{
            title: this.title,
            user: user.objectAt(0)
          });
          goal.save().then(()=>{
            this.set('title','');
          }).catch((err)=>{
            flashMessages.danger('Whoops. Your habit could not be created.');
            console.error(err);
          });
        }
      });
    }
  }
});
