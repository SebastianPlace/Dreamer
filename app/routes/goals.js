import Ember from 'ember';

var goals = [{
  id: 1,
  title: "Swim with dolphins",
  description: "Go to Australian and swim with dolphins",
},
{
  id: 2,
  title: "Swim with cats",
  description: "Go to Catalan and swim with cats",
},
{
  id: 3,
  title: "Swim with bats",
  description: "Go to Batalan and swim with bats",
}];

export default Ember.Route.extend({

  model() {
    return this.store.findAll('goal');
  },

  // model: function() {
  //   //todo return items from store
  //   return goals;
  //
  // },

});
