import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['col-md-4','habit-col'],
  isEditing: false,
  oldTitle:'',

  actions:{
    edit(){
      this.set('isEditing', true);
      this.set('oldTitle', this.get('habit.title'));
    },
    save(){
      this.set('isEditing', false);
      this.set('oldTitle', '');
      return this.habit.save();
    },
    delete(){
      this.habit.destroyRecord();
    },
    cancel(){
      this.set('habit.title', this.get('oldTitle'));
      this.set('isEditing', false);
    },
    //TODO refactor logNo and logYes into one function with 'completed' arg
    logNo(){
      let store = this.get('store');
      let habit = this.habit;
      let day = store.createRecord('day', {
        habit: habit,
        completed: false
      });
      habit.get('days').pushObject(day);
      day.save().then(function() {
        return habit.save();
      });
    },
    logYes(){
      let store = this.get('store');
      let habit = this.habit;
      let day = store.createRecord('day', {
        habit: habit,
        completed: true
      });
      habit.get('days').pushObject(day);
      day.save().then(function() {
        return habit.save();
      });
    }
  }
});
