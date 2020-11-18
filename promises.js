const returnsAPromise = function (string) {
  return new Promise((resolve, reject) => {
    if (typeof string === "string") {
      resolve(string + "is a string");
    } else {
      reject("Is not a string");
    }
  });
};

//ES5
returnsAPromise("test")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

returnsAPromise(1)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

//ES6
const checkPromise = async (str) => {
  try {
    const res = await returnsAPromise(str);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
checkPromise("TEST");
checkPromise(2);
