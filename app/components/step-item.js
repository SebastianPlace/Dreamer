import Ember from 'ember';

export default Ember.Component.extend({
  isEditing:false,
  stepDidChange : function() {
    this.get('step').save();
  }.observes('step.isDone'),

  actions:{
    edit(){
      this.set('isEditing',true);
    },
    save(){
      this.get('step').save();
      this.set('isEditing',false);
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
