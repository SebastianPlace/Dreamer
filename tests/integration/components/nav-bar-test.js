import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{nav-bar}}`);
  assert.equal(this.$().text().trim().replace(/ /g,''), 'Togglenavigation\n\n\n\n\nDreamer\n\n\n\n\nSignin');
});
