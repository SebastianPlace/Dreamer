import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('active-day-edit', 'Integration | Component | active day edit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{active-day-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#active-day-edit}}
      template block text
    {{/active-day-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
