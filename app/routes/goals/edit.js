import Ember from 'ember';

export default Ember.Route.extend({
  //action from rarwe!
  actions: {
    save() {
      const controller = this.get('controller'),
            goal = controller.get('model');

      return goal.save();
    },
  }

});
