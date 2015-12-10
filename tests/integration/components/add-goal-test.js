import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-goal', 'Integration | Component | add goal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{add-goal}}`);

  assert.equal(this.$().text().trim(), 'Add New Goal:\n\nAdd Goal');

  // Template block usage:" + EOL +
});

//Test goals are added correctly
