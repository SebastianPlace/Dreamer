import Ember from 'ember';

export default function makeGoalObjects(total){
  const goalNames = [
    'Goal Test',
    'Goal Number Two'
  ];
  const goalObjects = [];

  for (let i=0; i < total; i++) {
    const goalObject = Ember.Object.extend({
      // title: Ember.computed(() => goalNames[i]),
      title: goalNames[i],
    }).create();
    goalObjects.push(goalObject);
  }
  return goalObjects;
}
