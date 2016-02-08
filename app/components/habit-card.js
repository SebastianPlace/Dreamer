import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['habit-card'],
  isEditing: false,

  actions:{
    edit(){
      this.set('isEditing', true);
    },
    save(){
      this.set('isEditing', false);
      return this.habit.save();
    },
    delete(){
      this.habit.destroyRecord();
    },
    cancel(){
      this.set('isEditing', false);
    }
  }
});
