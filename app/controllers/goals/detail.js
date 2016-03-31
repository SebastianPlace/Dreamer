import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  isEditing: false,
  flashMessages: Ember.inject.service(),

  CLIENT_ID: "759792315428-2kta95s09dvs7up93td6bmtm81r78t43.apps.googleusercontent.com",
  SCOPES: ["https://www.googleapis.com/auth/calendar"],

  //TODO move this to when the app is launched
  //AND OR
  //TODO move init application route and call on signin success.
  init(){
    //check auth
    this._super(...arguments);
    let self = this;
    gapi.auth.authorize({
      'client_id': this.get('CLIENT_ID'),
      'scope': this.get('SCOPES').join(' ')
    }, function(authResult){
      if (authResult && !authResult.error) {
        self.send('loadCalendarApi');
      }
    });
  },

  actions:{
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
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });

      request.execute((event) => {
        console.log(event);
      });
    },

    loadCalendarApi(){
      //loads the version 3 api to use calendar functions from client object
      gapi.client.load('calendar', 'v3').then(()=>{
        console.log("calendar loaded");
        // let request = gapi.client.calendar.events.list({
        //   'calendarId': 'primary',
        //   'timeMin': (new Date()).toISOString(),
        //   'showDeleted': false,
        //   'singleEvents': true,
        //   'maxResults': 10,
        //   'orderBy': 'startTime'
        // });
        // request.execute(function(resp) {
        //   console.log(resp.items);
        // });
      });

    },

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
