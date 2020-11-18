function add() {
  var counter = 0;
  counter += 1;
  return counter;
}

add();
add();
add();

var counter = (function () {
  var privateCounter = 0;
  function changedBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changedBy(1);
    },
    decrement: function () {
      changedBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();
console.log(counter.value());
counter.increment();
counter.increment();
console.log(counter.value());
