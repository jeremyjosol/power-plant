import { storeState, changeState } from './../src/js/powerplant.js';

describe('storeState', () => {
  test('it should correctly store and update when state is changed', () => {
    const stateControl = storeState();
    const feed = changeState("soil")(1);
    const newState = stateControl(feed);
    expect(newState).toEqual({ soil : 1 });
  });

  test('it should correctly store and update when state is changed twice', () => {
    const stateControl = storeState();
    const feed = changeState("soil")(1);
    const compostTea = changeState("soil")(5);
    stateControl(feed);
    const newStateWithCompostTea = stateControl(compostTea);
    expect(newStateWithCompostTea).toEqual({ soil : 6 });
  });

  test('it should correctly store and update with new property', () => {
    const stateControl = storeState();
    const feed = changeState("soil")(1);
    const compostTea = changeState("soil")(5);
    const sunlight = changeState("photosynthesis")(25);
    stateControl(feed);
    stateControl(compostTea);
    const newStateWithSunlight = stateControl(sunlight);
    expect(newStateWithSunlight).toEqual({ soil : 6, photosynthesis: 25 });
  });
});

