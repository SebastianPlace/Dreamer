import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  flashMessages: Ember.inject.service(),

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
