import Ember from 'ember';

export default Ember.Component.extend({
  isEditing:false,
  flashMessages: Ember.inject.service(),

  stepDidChange : function() {
    this.get('step').save();
  }.observes('step.isDone'),

  actions:{
    edit(){
      this.set('isEditing',true);
    },
    save(){
      const flashMessages = Ember.get(this, 'flashMessages');
      this.get('step').save().then(()=>{
        flashMessages.success('Save successful!');
        this.set('isEditing',false);

      }).catch((err) => {
        flashMessages.danger('Whoops. Your changes could not be saved.');
        console.error(err);
      });
    },
    delete(){
      this.get('deleteStep')(this.get('step'));
    },
    cancel(){
      this.step.rollbackAttributes();
      this.set('isEditing', false);
    }
  }

});
