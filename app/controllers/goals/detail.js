import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  oldTitle:'',
  actions:{
    delete(){
      this.model.destroyRecord();
      this.transitionToRoute('goals');
    },
    edit() {
      this.set('oldTitle', this.get('model.title'));
      this.set('isEditing', true);
    },
    cancel(){
      this.set('model.title', this.get('oldTitle'));
      this.set('isEditing', false);
    },
    save() {
      this.set('isEditing', false);
      return true;
    },
  }
});
