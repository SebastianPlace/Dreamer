import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  flashMessages: Ember.inject.service(),
  classNames: ['col-sm-6','habit-col'],
  isEditing: false,
  isAddingDays: false,
  today: new Date(),
  //TODO refactor to seperate datetime-picker component
    //declare vars startAt & endAt here, move startDate etc to component
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,

  isValid: Ember.observer('habit.title', function(){
    let title = this.get('habit.title');
    if(!title || title === null || title === undefined || title ==='' || title ===" "){
      return false;
    }
    return true;
  }),

  concatDateTime(date, time){
    const hours = parseInt(time.substring(0, 2));
    const minutes = parseInt(time.substring(3, 5));
    return moment(date).set({
      'hour':hours,
      'minute': minutes,
      'second': 0
    });
  },

  datesDidChange : function() {
    if(this.get('habit.hasDirtyAttributes') && !this.get('habit.isNew') && !this.get('habit.isSaving')){
      this.set('isAddingDays', true);
    }
  }.observes('habit.hasDirtyAttributes').on('init'),

  eventIsInput(){
    const hasStartTime = this.get('startTime');
    const hasStartDate = this.get('startDate');
    const hasEndTime = this.get('endTime');
    const hasEndDate = this.get('endDate');
    if (hasStartTime && hasStartDate && hasEndTime && hasEndDate) {
      return true;
    }else {
      return false;
    }
  },
  eventIsValid(){
    //start date IS BEFORE end date
    if(this.eventIsInput()){
      let startDate = this.concatDateTime(this.get('startDate'), this.get('startTime'));
      let endDate = this.concatDateTime(this.get('endDate'), this.get('endTime'));
      if (endDate.isAfter(startDate)){
        console.log("This is valid");
        return true;
      }
    }
    return false;
  },
  actions:{
    deleteEvent(){
      let eventObject = {
        habitId: this.habit.get('id'),
        calendarEventId: this.habit.get('calendarEvent.id'),//Event Firebase ID
        eventId: this.habit.get('calendarEvent.eventId'),//Event Google Cal ID
      };
      this.get('deleteEvent')(eventObject);
    },

    //Call this after checking is done
    addEvent(){
      //Send eventObject to controllers/goals/detail
      let eventObject = {
        habitId: this.habit.get('id'),
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
      console.log(this.eventIsValid());
      if(!this.habit.get('calendarEvent.content') && this.eventIsValid()){
        this.send('addEvent');
      }else{
        flashMessages.danger('Please enter valid dates.');
      }
      if(this.isValid()){
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
      }else{
        flashMessages.danger('Habit title must not be blank.');
      }

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
      if(this.get('habit.hasDirtyAttributes')){
        this.habit.rollbackAttributes();
      }
      this.set('isEditing', false);
      this.set('isAddingDays', false);
    },
  }
});
