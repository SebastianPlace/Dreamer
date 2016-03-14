import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-6','habit-col'],
  isEditing: false,
  //TODO use this function to style habit when it is completed for the day
  //TODO change to if today on datepicker, is complete.
  // isCompleted: Ember.computed.bool('habit.days', function(){
  //   const days = this.get('habit.days');
  //   const currentDay= new Date().toDateString();
  //   const today = days.filterBy('date',currentDay);
  //   if(today.get('isCompleted')){
  //     return true;
  //   }
  // }),
  // convertedDays: Ember.computed('selectedDays', function(){
  //   let selectedDays = this.get('selectedDays');
  //   if(selectedDays){
  //     for(let i=0; i<selectedDays.length; i++){
  //       selectedDays[i] = selectedDays[i].toDateString();
  //       console.log(selectedDays[i]);
  //     }
  //   }
  // }),

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
