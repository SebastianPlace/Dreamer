import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),
  classNames: ['col-sm-6','habit-col'],
  isEditing: false,
  today: new Date(),
  //TODO refactor to seperate datetime-picker component
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  isAddingDays: false,

  datesDidChange : function() {
    if(this.get('habit.hasDirtyAttributes')){
      this.set('isAddingDays', true);
    }
  }.observes('habit.hasDirtyAttributes').on('init'),

  concatDateTime(date, time){
    const hours = parseInt(time.substring(0, 2));
    const minutes = parseInt(time.substring(3, 5));
    return moment(date).set({
      'hour':hours,
      'minute': minutes,
      'second': 0
    });
  },
  actions:{
    addEvent(){
      //Send eventObject to controllers/goals/detail
      let eventObject = {
        habit: this.habit.get('id'),
        title: this.habit.get('title'),
        notes: this.habit.get('notes'),
        startAt: this.concatDateTime(this.get('startDate'), this.get('startTime')),
        endAt: this.concatDateTime(this.get('endDate'), this.get('endTime')),
        activeDays: this.habit.get('activeDays')
      };
      this.get('addEvent')(eventObject);
    },

    edit(){
      this.habit.rollbackAttributes();
      this.set('isEditing', true);
      this.set('isAddingDays', false);
    },

    save(){
      const flashMessages = Ember.get(this, 'flashMessages');
      this.habit.save()
      .then(() => {
        flashMessages.success('Changes saved successfully!');
        this.set('isEditing', false);
        this.set('isAddingDays', false);
      })
      .catch((err) => {
        flashMessages.danger('Whoops. Your changes could not be saved.');
        console.error(err);
      });
    },

    delete(){
      const flashMessages = Ember.get(this, 'flashMessages');
      this.habit.destroyRecord().then(()=>{
        flashMessages.success('Habit deleted!');
      }).catch((err) => {
        flashMessages.danger('Whoops. Your habit could not be deleted.');
        console.error(err);
      });
    },

    cancel(){
      this.habit.rollbackAttributes();
      this.set('isEditing', false);
      this.set('isAddingDays', false);
    },
  }
});
