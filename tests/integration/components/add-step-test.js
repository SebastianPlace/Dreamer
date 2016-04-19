import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-step', 'Integration | Component | add step', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{add-step}}`);
  assert.equal(this.$().text().trim(), 'Add Step');
});
