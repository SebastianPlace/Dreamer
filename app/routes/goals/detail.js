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
        return this.send('destroyHabit',habit);
      });
      Ember.RSVP.all(deletions).then(() => {
        return goal.destroyRecord();
      }).catch((err) => {
        console.log(err);
      });
      this.transitionTo('goals');
    },
    destroyHabit(habit){
      const deletions = habit.get('days').map((day) => {
        return day.destroyRecord();
      });
      Ember.RSVP.all(deletions).then(() => {
        return habit.destroyRecord();
      }).catch((err) => {
        console.log(err);
      });
    }
  },

});
