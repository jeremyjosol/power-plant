import { storeState, changeState } from './../src/js/powerplant.js';

describe('storeState', () => {
  test('it should correctly store and update when state is changed', () => {
    const stateControl = storeState();
    const feed = changeState("soil")(1);
    const newState = stateControl(feed);

    expect(newState).toEqual({ soil : 1 });
  });
});

