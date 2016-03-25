import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(){
      const controller = this.get('controller');
      const goal = controller.get('model');
      return goal.save();
    },
    delete(){
      const controller = this.get('controller');
      const goal = controller.get('model');
      const deletions = goal.get('habits').map((habit) => {
        return habit.destroyRecord();
      });
      Ember.RSVP.all(deletions).then(() => {
        return goal.destroyRecord();
      }).catch((err) => {
        console.error(err);
      });
      this.transitionTo('goals');
    },
  },
});
