import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // this.route('goals', {path:'/'},function() {
  this.route('goals', function() {
    this.route('detail',{
      path: ":goal_id"
    });
  });
  this.route('page-not-found', {path:'/*wildcard'});
});

export default Router;
