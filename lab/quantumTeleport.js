/* global require:true, console:true, exports:true, __dirname:true */
import Q from '../lib'

const jsqubits = Q

const applyTeleportation = exports.applyTeleportation = function (state) {
  const alicesMeasurement = state.cnot(2, 1)
    .hadamard(2)
    .measure({
      from: 1,
      to: 2
    });
  let resultingState = alicesMeasurement.newState;
  if (alicesMeasurement.result & 1) {
    resultingState = resultingState.x(0);
  }
  if (alicesMeasurement.result & 2) {
    resultingState = resultingState.z(0);
  }
  return resultingState;
};


const stateToBeTransmitted0 = jsqubits('|0>')
  .multiply(jsqubits.complex(0.5, 0.5));
const stateToBeTransmitted1 = jsqubits('|1>')
  .multiply(jsqubits.complex(0, Math.sqrt(0.5)));
const stateToBeTransmitted = stateToBeTransmitted0.add(stateToBeTransmitted1);

console.log(`State to be transmitted: ${stateToBeTransmitted}`);

const bellState = jsqubits('|00>')
  .add(jsqubits('|11>'))
  .normalize();
const initialState = stateToBeTransmitted.tensorProduct(bellState);

const finalState = applyTeleportation(initialState);

console.log(`Final state: ${finalState}`);
