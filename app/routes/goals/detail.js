import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),
  
  actions: {
    save(){
      const flashMessages = Ember.get(this, 'flashMessages');
      const controller = this.get('controller');
      const goal = controller.get('model');
      goal.save().then(()=>{
        flashMessages.success('Save successful!');
      }).catch((err)=>{
        flashMessages.danger('Whoops. Your changes could not be saved.');
        console.error(err);
      });
    },
    delete(){
      const flashMessages = Ember.get(this, 'flashMessages');
      const controller = this.get('controller');
      const goal = controller.get('model');
      const deletions = goal.get('habits').map((habit) => {
        habit.destroyRecord();
      });
      Ember.RSVP.all(deletions).then(() => {
        goal.destroyRecord().then(()=>{
          flashMessages.success('Goal deleted.');
        });
      }).catch((err) => {
        flashMessages.danger('Whoops. Your goal could not be deleted.');
        console.error(err);
      });
      this.transitionTo('goals');
    },
  },
});
