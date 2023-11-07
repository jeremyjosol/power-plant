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

const stateUpdate = stateControl((state) => {
  if (state.soilMoisture >= 5 && state.photosynthesis >= 10) {
    return {
      ...state,
      bioavailability: state.soilMoisture + state.photosynthesis,
    };
  }
  return state;
});


window.onload = function() {
  document.getElementById('feed').onclick = function() {
    const newState = stateControl(compostTea);
    document.getElementById('soil-moisture').innerText = `Soil: ${newState.soilMoisture}`;
  };

  document.getElementById('sunlight').onclick = function() {
    const newState = stateControl(sunlight);
    document.getElementById('photosynthesis').innerText = `Photosynthesis: ${newState.photosynthesis}`;
  };

  document.getElementById('show-state').onclick = function() {
    const currentState = stateUpdate();
    document.getElementById('bioavailability').innerText = `Bioavailability: ${currentState.bioavailability}`;
  };
};
