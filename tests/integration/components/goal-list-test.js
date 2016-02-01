import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import makeGoalObjects from '../../helpers/make-goal-objects';
moduleForComponent('goal-list', 'Integration | Component | goal list', {
  integration: true
});

test('displays goals if there are goals',function(assert){
  assert.expect(1);
  const model = makeGoalObjects(1);
  this.set('model', model);
  this.render(hbs`{{goal-list goals=model}}`);
  assert.equal(this.$().text().trim(), 'Goal Test');
});

test('displays message if there are no goals',function(assert){
  assert.expect(1);
  const model = makeGoalObjects(0);
  this.set('model', model);
  this.render(hbs`{{goal-list goals=model}}`);
  assert.equal(this.$().text().trim(), 'You have no goals.');
});
