import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-6','habit-col'],
  isEditing: false,
  actions:{
    edit(){
      this.set('isEditing', true);
    },

    save(){
      this.set('isEditing', false);
      this.set('oldTitle', '');
      return this.habit.save();
    },

    delete(){
      const habit = this.habit;
      const deletions = habit.get('days').map((day) => {
        return day.destroyRecord();
      });
      Ember.RSVP.all(deletions).then(() => {
        return habit.destroyRecord();
      }).catch((err) => {
        console.log(err);
      });
    },

    cancel(){
      this.habit.rollbackAttributes();
      this.set('isEditing', false);
    },

    logDay(isCompleted){
      this.get('logDay')(isCompleted, this.habit);
    },
  }
});
