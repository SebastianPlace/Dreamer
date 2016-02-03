import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  actions:{
    delete(){
      this.model.destroyRecord();
      this.transitionToRoute('goals');
    },
    edit() {
      this.set('isEditing', true);
    },
    cancel(){
      this.set('isEditing', false);
    },
    save() {
      this.set('isEditing', false);
      return true;
    },
  }
});
