// stores our state
export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const stateControl = storeState();

// function factory
export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feed = changeState("soil")(1);
const compostTea = changeState("soil")(5);
const sunlight = changeState("photosynthesis")(25);

stateControl(feed);
stateControl(compostTea);
stateControl(sunlight);

const stateUpdate = stateControl((state) => {
  let bioavailability = state.soil + state.photosynthesis;
  if (state.soil >= 5 && state.photosynthesis >= 10) {
    return {
      ...state,
      bioavailability,
    };
  }
  return state;
});

console.log(stateUpdate);
