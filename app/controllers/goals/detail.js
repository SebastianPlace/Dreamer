import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  flashMessages: Ember.inject.service(),

  getActiveDaysString(activeDays){
    let keys = Object.keys(activeDays);
    let daysArray = keys.filter(function(key) {
        return activeDays[key];
    });
    return daysArray.toString();
  },
  createEventRecord(eventId, eventObject){
    const flashMessages = Ember.get(this, 'flashMessages');
    const habit = this.store.peekRecord('habit', eventObject.habitId);
    const calendarEvent = this.store.createRecord('calendarEvent', {
      habit: habit,
      eventId: eventId,
      title: eventObject.title,
      description: eventObject.notes,
      startAt: new Date(eventObject.startAt),
      endAt: new Date(eventObject.endAt)
    });
    calendarEvent.save()
    .then((resp)=>{
      habit.get('calendarEvent').set(resp.id);
      habit.save();
      flashMessages.success('Your schedule was successfully saved!');
    }).catch((err)=>{
      flashMessages.danger('Whoops. Your event could not be created.');
      console.error(err);
    });

  },

  actions:{
    //For more info on recurrence see: http://tools.ietf.org/html/rfc5545#section-3.8.5
    //Create calendar event & save event info to store as calendarEvent
    addEvent(eventObject){
      const event = {
        'summary': eventObject.title,
        'description': eventObject.notes,
        'start': {
          'dateTime': eventObject.startAt,
          'timeZone': 'Europe/London'
        },
        'end': {
          'dateTime': eventObject.endAt,
          'timeZone': 'Europe/London'
        },
        'recurrence': [
          'RRULE:FREQ=WEEKLY;WKST=MO;BYDAY='+this.getActiveDaysString(eventObject.activeDays),
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      let request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });

      request.execute((event) => {
        //create record in store
        this.createEventRecord(event.id, eventObject);
      });
    },
    deleteEvent(eventObject){
      const flashMessages = Ember.get(this, 'flashMessages');
      const habit = this.store.peekRecord('habit', eventObject.habitId);
      const calendarEvent = this.store.peekRecord('calendarEvent', eventObject.calendarEventId);

      //DELETE from calendar
      let request = gapi.client.calendar.events.delete({
        'calendarId': 'primary',
        'eventId': eventObject.eventId
      });
      request.execute((resp) => {
        console.log(resp);
      });

      //DELETE from store
      calendarEvent.destroyRecord().then(()=>{
        habit.set('calendarEvent', undefined);
        habit.save();
      }).catch((err)=>{
        flashMessages.danger('Whoops. Schedule could not be delete.');
        console.error(err);
      });
    },

    edit(){
      this.set('isEditing', true);
    },
    cancel(){
      if (this.get('model.hasDirtyAttributes')) {
        this.model.rollbackAttributes();
      }
      this.set('isEditing', false);
    },
    save(){
      this.set('isEditing', false);
      return true;
    },
    delete(){
      //TODO create a modal which asks if you want to delete (forgiving UI)
      return true;
    },

    deleteStep(step){
      const flashMessages = Ember.get(this, 'flashMessages');
      step.destroyRecord().catch((err)=>{
        flashMessages.danger('Whoops. Your step could not be deleted.');
        console.error(err);
      });
    }
  }
});
