const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("messagedLogged", function (doc) {
  console.log("messagedLogged triggerd");
  console.log(doc);
});

function emitCustomEvent() {
  emitter.emit("messagedLogged");
}
function emitCustomEventWithValues(obj) {
  emitter.emit("messagedLogged", obj);
}

module.exports.emitCustomEvent = emitCustomEvent;
module.exports.emitCustomEventWithValues = emitCustomEventWithValues;
