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

  saveHabit: function(){
    Ember.run.next(()=>{
      this.habit.save();
    });
  },
  
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
      this.set('isEditing', false);
      this.set('oldTitle', '');
      return this.habit.save();
    },

    delete(){
      this.habit.destroyRecord();
    },

    cancel(){
      this.habit.rollbackAttributes();
      this.set('isEditing', false);
    },
  }
});
