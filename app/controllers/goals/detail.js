import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions:{
    edit(){
      this.set('isEditing', true);
    },
    cancel(){
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    save(){
      this.set('isEditing', false);
      return true;
    },
    logDay(isCompleted, habit){
      const today = new Date().toDateString();
      const existing = habit.get('days').findBy('date', today);
      if(existing === undefined){
        let day = this.store.createRecord('day', {
          habit: habit,
          isCompleted: isCompleted,
          date: today
        });
        habit.get('days').pushObject(day);
        day.save().then(function() {
          return habit.save();
        });
      }else if(existing && isCompleted !== existing.get('isCompleted')){
        existing.set('isCompleted', isCompleted);
        existing.save();
      }
    },
  }
});
