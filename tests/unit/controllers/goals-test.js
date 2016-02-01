import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:goals', 'Unit | Controller | goals', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

//test that createGoal adds a goal to the store
// test('goal is saved in store', function(assert){
//   assert.expect(1)
//   let controller = this.subject();
//   controller.set('title','Controller Goal Test');
// //  Ember.run(function(){
//   controller.send('createGoal');
//   assert.equal(controller.get('model'),'Controller Goal Test');
//   //});
//
//   //get store, check store
// });
