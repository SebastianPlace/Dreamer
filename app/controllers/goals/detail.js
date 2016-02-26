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
  }
});
