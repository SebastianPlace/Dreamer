import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-6','habit-col'],
  isEditing: false,
  today: new Date().toDateString(),
  //TODO user this function to style habit when it is completed for the day
  isCompleted: Ember.computed.bool('habit.days', function(){
    const days = this.get('habit.days');
    const currentDay= new Date().toDateString();
    const today = days.filterBy('date',currentDay);
    if(today.get('isCompleted')){
      return true;
    }
  }),

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
      console.log(this.isCompleted);
      this.get('logDay')(isCompleted, this.habit);
    },
  }
});
