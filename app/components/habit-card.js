import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['col-md-4','habit-col'],
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
      const store = this.get('store');
      const habit = this.habit;
      const today = new Date().toDateString();
      const existing = habit.get('days').findBy('date', today);
      if(existing === undefined){
        let day = store.createRecord('day', {
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
    }
  }
});
