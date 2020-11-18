const loggerModule = require("./logger.module");
const pathModule = require("./path.module");
const osModule = require("./os.module");
const fsModule = require("./fs.module");
const eventEmitterModule = require("./eventEmitter.module");

//Logger Module
console.log(loggerModule);
loggerModule.log("IT WORKS");
//loggerModule("IT WORKS");

//Path Module
console.log(__dirname, __filename);
pathModule(__filename);

//OS module
osModule();

//FS module
fsModule.getFilesAsync("./");
fsModule.getFilesSync("./");

//EventEmitter
eventEmitterModule.emitCustomEvent();
eventEmitterModule.emitCustomEventWithValues({ id: 2, Name: "john" });

//Logger Class
const Logger = require("./logger.class");
const logger = new Logger();

logger.on("messageLogged", function (doc) {
  console.log(doc);
});
logger.log({ id: 4, name: "IT WORKS" });
