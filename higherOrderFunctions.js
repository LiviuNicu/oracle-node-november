let obj = [
  {
    name: "John",
    math: 5,
    science: 10,
  },
  {
    name: "Ana",
    math: 8,
    science: 7,
  },
  {
    name: "Alex",
    math: 10,
    science: 7,
  },
];

// for (let i = 0; i < obj.length; i++) {
//   obj[i].math += 1;
// }
let newClonedArray = JSON.parse(JSON.stringify(obj));
let newArray = newClonedArray.map((currrentElement, index, initialArray) => {
  currrentElement.math += 1;
  return currrentElement;
});
console.log(newArray, obj);

let newArrayFiltered = newClonedArray.filter(
  (currrentElement, index, initialArray) => {
    return currrentElement.math > 8;
  }
);
console.log(newArrayFiltered);
let newArrayFind = newClonedArray.find(
  (currrentElement, index, initialArray) => {
    return currrentElement.math > 8;
  }
);
console.log(newArrayFind);

let sum = newClonedArray.reduce((acumulator, currrentElement) => {
  acumulator += currrentElement.math;
  return acumulator;
}, 0);
console.log(sum);
