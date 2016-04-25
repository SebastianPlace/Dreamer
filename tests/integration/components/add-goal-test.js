import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-goal', 'Integration | Component | add goal', {
  integration: true,
  beforeEach: function () {
    this.inject.service('store');
  },

});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.render(hbs`{{add-goal}}`);
  assert.equal(this.$().text().trim(), 'Add Goal');
});

test('it adds a valid goal', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{habit-card}}`);
  //add text to input
  //click button
  //check that the value has been added to the store?
  assert.equal(this.$().text().trim(), '');
});

//TODO: test that goal is saved in store
// test('goal is saved to store on button click', function(assert){
//   assert.expect(1);
//
// });

//TODO test that input field clear on enter
