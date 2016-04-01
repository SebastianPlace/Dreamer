import Ember from 'ember';

export default Ember.Controller.extend({
  CLIENT_ID: "759792315428-2kta95s09dvs7up93td6bmtm81r78t43.apps.googleusercontent.com",
  SCOPES: ["https://www.googleapis.com/auth/calendar"],

  init(){
    this._super(...arguments);
    gapi.auth.authorize({
      'client_id': this.get('CLIENT_ID'),
      'scope': this.get('SCOPES').join(' ')
    }, function(authResult){
      if (authResult && !authResult.error) {
        gapi.client.load('calendar', 'v3');
      }
    });
  },
});
