
import Q from '../lib'

const jsqubits = Q

export function simpleSearch(f) {
  const inputBits = {
    from: 1,
    to: 2
  };
  return jsqubits('|001>')
    .hadamard(jsqubits.ALL)
    .applyFunction(inputBits, 0, f)
    .hadamard(inputBits)
    .z(inputBits)
    .controlledZ(2, 1)
    .hadamard(inputBits)
    .measure(inputBits)
    .result;
};


const f = function (x) {
  return x === 2 ? 1 : 0;
};
console.log(`f(x) = 1 for x = ${simpleSearch(f)}`);
