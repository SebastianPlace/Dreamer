import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-md-4','habit-col'],
  isEditing: false,
  oldTitle:'',
  actions:{
    edit(){
      this.set('isEditing', true);
      this.set('oldTitle', this.get('habit.title'));
    },
    save(){
      this.set('isEditing', false);
      this.set('oldTitle', '');
      return this.habit.save();
    },
    delete(){
      this.habit.destroyRecord();
    },
    cancel(){
      this.set('habit.title', this.get('oldTitle'));
      this.set('isEditing', false);
    },
    logNo(){
      //this.habit.dateLog;
      console.log("NAAGAHAHHAG!!");
    },
    logYes(){
      console.log("YESSSSS");
    }

  }
});
