import Ember from 'ember';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),
  classNames: ['col-sm-6','habit-col'],
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
  today: new Date(),

  //This save is scheduled to run within a separate run loop with a 1 ms wait.
  //See: http://emberjs.com/api/classes/Ember.run.html#method_next
  saveHabit: function(){
    Ember.run.next(()=>{
      this.habit.save().catch((err)=>{
        console.error(err);
      });
    });
  },
  //This is not the most effective way to do this.
  //When multiple dates are clicked quickly, only some are saved.
  //TODO wait until user has entered all days before saving!
  datesDidChange : function() {
    //wait for habit attrs to change before save is called
    //throttle prevents habit from being saved before the model is habit attributes have changed
    if(this.get('habit.hasDirtyAttributes')){
      Ember.run.throttle(this, this.saveHabit, 250);
    }
  }.observes('habit.hasDirtyAttributes'),

  actions:{
    edit(){
      this.set('isEditing', true);
    },

    save(){
      const flashMessages = Ember.get(this, 'flashMessages');
      this.habit.save()
      .then(() => {
        flashMessages.success('Habit deleted.');
        this.set('isEditing', false);
      })
      .catch((err) => {
        flashMessages.danger('Whoops. Your changes could not be saved.');
        console.error(err);
      });
    },

    delete(){
      const flashMessages = Ember.get(this, 'flashMessages');
      this.habit.destroyRecord().then(()=>{
        flashMessages.success('Save successful!');
      }).catch((err) => {
        flashMessages.danger('Whoops. Your habit could not be deleted.');
        console.error(err);
      });
    },

    cancel(){
      this.habit.rollbackAttributes();
      this.set('isEditing', false);
    },
  }
});
