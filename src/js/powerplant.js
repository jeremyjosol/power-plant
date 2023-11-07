// stores our state
export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const stateControl = storeState();

// function factory
export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

const compostTea = changeState("soilMoisture")(5);
const sunlight = changeState("photosynthesis")(25);

stateControl(compostTea);
stateControl(sunlight);

const stateUpdate = stateControl((state) => {
  let bioavailability = state.soilMoisture + state.photosynthesis;
  if (state.soilMoisture >= 5 && state.photosynthesis >= 10) {
    return {
      ...state,
      bioavailability,
    };
  }
  return state;
});

console.log(stateUpdate);

window.onload = function() {
  document.getElementById('feed').onclick = function() {
    const newState = stateControl(compostTea);
    document.getElementById('soil-moisture').innerText = `Soil: ${newState.soilMoisture}`;
  };

  document.getElementById('show-state').onclick = function() {
    const currentState = stateControl();
    document.getElementById('soil-moisture').innerText = `Soil: ${currentState.soilMoisture}`;
  };
};
