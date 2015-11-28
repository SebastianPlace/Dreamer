import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-goal', 'Integration | Component | add goal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{add-goal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#add-goal}}
      template block text
    {{/add-goal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('new goals are persisted', function(assert){
  //check that goals are persisted to model
});
