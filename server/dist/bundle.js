/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/ConnectionSocket.ts":
/*!*****************************************!*\
  !*** ./src/classes/ConnectionSocket.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log */ "./src/classes/Log.ts");

var ConnectionSocket = /** @class */ (function () {
    function ConnectionSocket() {
    }
    ConnectionSocket.initServer = function (port) {
        var io = __webpack_require__(/*! socket.io */ "socket.io")();
        //When a socket get connected
        io.on("connection", function (socket) {
            _Log__WEBPACK_IMPORTED_MODULE_0__["default"].addLog(socket.request.connection.remoteAddress, "server", "undefined", "SOCKET_CONNECTION_ESTABLISHED");
        });
        //Listening to the port
        io.listen(port);
        _Log__WEBPACK_IMPORTED_MODULE_0__["default"].addLog("connection_socket", "server", "undefined", "CONNECTION_ESTABLISED_ON_PORT:" + port);
    };
    return ConnectionSocket;
}());
/* harmony default export */ __webpack_exports__["default"] = (ConnectionSocket);


/***/ }),

/***/ "./src/classes/Database.ts":
/*!*********************************!*\
  !*** ./src/classes/Database.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Log */ "./src/classes/Log.ts");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_connections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/connections */ "./src/constants/connections.ts");



var Database = /** @class */ (function () {
    function Database() {
    }
    Database.initDatabase = function () {
        return mongoose__WEBPACK_IMPORTED_MODULE_1__["connect"](_constants_connections__WEBPACK_IMPORTED_MODULE_2__["DATABASE_URL"], { useNewUrlParser: true }, function (err) {
            if (err) {
                _Log__WEBPACK_IMPORTED_MODULE_0__["default"].addError(err);
                return false;
            }
            else {
                _Log__WEBPACK_IMPORTED_MODULE_0__["default"].addLog("database", "server", "admin", "DATABASE_CONNECTED");
                return true;
            }
        });
    };
    return Database;
}());
/* harmony default export */ __webpack_exports__["default"] = (Database);


/***/ }),

/***/ "./src/classes/Log.ts":
/*!****************************!*\
  !*** ./src/classes/Log.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Class to add log files and to show logging on console
 */
var Log = /** @class */ (function () {
    function Log() {
    }
    /**
     * Logging data to file
     * @param  {string} fileName name of the file to be logged
     * @param  {string} path path of the file to be saved
     * @returns {boolean} wether the save successfull or not
     */
    Log.logToFile = function (fileName, path, record) {
        record = "\n" + record;
        return new Promise(function (resolve, reject) {
            fs__WEBPACK_IMPORTED_MODULE_0__["appendFile"](path + fileName, record, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    /**
     * Function craeates a standard record to be saved
     * @param  {string} sender sender of the data
     * @param  {string} reciever reciever of the data client
     * @param  {string} data data to be saved
     * @returns {string} Record as a string
     */
    Log.createRecord = function (sender, reciever, data, user) {
        if (user === void 0) { user = "unknown"; }
        var time = new Date();
        var timeString = time.toLocaleString().toString();
        var str = timeString + "\t" + sender + "\t" + reciever + "\t" + user + "\t" + data;
        return str;
    };
    /**
     * Function craeates a standard record in console
     * @param  {string} sender sender of the data
     * @param  {string} reciever reciever of the data client
     * @param  {string} data data to be saved
     * @returns {void}
     */
    Log.consoleRecord = function (sender, reciever, data) {
        var time = new Date();
        console.log("\x1b[33m" +
            time
                .toLocaleString()
                .toString()
                .padEnd(25, " ") +
            "\x1b[0m" +
            "\x1b[34m" +
            sender.padEnd(25, " ") +
            "\x1b[35m" +
            reciever.padEnd(25, " ") +
            "\x1b[36m" +
            data.padEnd(45, " ") +
            "\x1b[0m");
    };
    /**
     * Creates an error record
     * @param  {string} error error to be saved
     * @returns {string}
     */
    Log.createErrorString = function (error) {
        var time = new Date();
        var timeString = time.toLocaleString().toString();
        return timeString + "\t" + error.message;
    };
    Log.consoleError = function (error) {
        var time = new Date();
        var timeString = time.toLocaleString().toString();
        console.log("\x1b[34m" + timeString + "\x1b[31m ERROR::: " + error.message + "\x1b[0m");
    };
    /**
     * @param  {string} sender sender of the data
     * @param  {string} reciever reciver of the data
     * @param  {string} user="unknown" user involved
     * @param  {string} data data to be sent
     * @returns {void}
     */
    Log.addLog = function (sender, reciever, user, data) {
        if (user === void 0) { user = "unknown"; }
        var time = new Date();
        var timeString = time.getFullYear() + "_" + time.getMonth() + "_" + time.getDate();
        var folderName = "./logs/" + timeString + "/";
        fs__WEBPACK_IMPORTED_MODULE_0__["exists"](folderName, function (exist) {
            if (exist) {
                var fileName = timeString + (" " + time.getHours() + "_log.txt");
                Log.logToFile(fileName, folderName, Log.createRecord(sender, reciever, data, user)).catch(function (err) {
                    console.log(Log.createErrorString(err));
                });
            }
            else {
                fs__WEBPACK_IMPORTED_MODULE_0__["mkdir"](folderName, function (err) {
                    if (!err) {
                        var fileName = timeString + (" " + time.getHours() + "_log.txt");
                        Log.logToFile(fileName, folderName, Log.createRecord(sender, reciever, data, user)).catch(function (err) {
                            console.log(Log.createErrorString(err));
                        });
                    }
                    else {
                        //TODO::: Handle error
                        console.log(err);
                    }
                });
            }
        });
        Log.consoleRecord(sender, reciever, data);
    };
    /**
     * @param  {string} error error to be recorded
     * @returns {void}
     */
    Log.addError = function (error) {
        var time = new Date();
        var timeString = time.getFullYear() + "_" + time.getMonth() + "_" + time.getDate();
        var folderName = "./logs/" + timeString + "/";
        fs__WEBPACK_IMPORTED_MODULE_0__["exists"](folderName, function (exist) {
            if (exist) {
                var fileName = timeString + (" " + time.getHours() + "_error.txt");
                Log.logToFile(fileName, folderName, Log.createErrorString(error)).catch(function (err) {
                    console.log(Log.createErrorString(err));
                });
            }
            else {
                fs__WEBPACK_IMPORTED_MODULE_0__["mkdir"](folderName, function (err) {
                    if (!err) {
                        var fileName = timeString + (" " + time.getHours() + "_error.txt");
                        Log.logToFile(fileName, folderName, Log.createErrorString(error)).catch(function (err) {
                            console.log(Log.createErrorString(err));
                        });
                    }
                    else {
                        //TODO::: Handle error
                        console.log(err);
                    }
                });
            }
        });
        Log.consoleError(error);
    };
    return Log;
}());
/* harmony default export */ __webpack_exports__["default"] = (Log);


/***/ }),

/***/ "./src/constants/connections.ts":
/*!**************************************!*\
  !*** ./src/constants/connections.ts ***!
  \**************************************/
/*! exports provided: DATABASE_URL, USER_DATABASE, SOCKET_CONNECTION_PORT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATABASE_URL", function() { return DATABASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_DATABASE", function() { return USER_DATABASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOCKET_CONNECTION_PORT", function() { return SOCKET_CONNECTION_PORT; });
//database name
var DATABASE_NAME = "material_designer_test01";
//Database connection url
var DATABASE_URL = "mongodb://localhost:27017/" + DATABASE_NAME;
//collection of users
var USER_DATABASE = "users";
//Socket.io connection port
var SOCKET_CONNECTION_PORT = 9900;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Log */ "./src/classes/Log.ts");
/* harmony import */ var _classes_ConnectionSocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/ConnectionSocket */ "./src/classes/ConnectionSocket.ts");
/* harmony import */ var _classes_Database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Database */ "./src/classes/Database.ts");
/* harmony import */ var _constants_connections__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants/connections */ "./src/constants/connections.ts");




var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function () {
        _classes_Log__WEBPACK_IMPORTED_MODULE_0__["default"].addLog("server", "admin", "unknown", "SERVER_RESTART");
        _classes_Database__WEBPACK_IMPORTED_MODULE_2__["default"].initDatabase();
        _classes_ConnectionSocket__WEBPACK_IMPORTED_MODULE_1__["default"].initServer(_constants_connections__WEBPACK_IMPORTED_MODULE_3__["SOCKET_CONNECTION_PORT"]);
    };
    return Main;
}());
console.log("Starting the server");
Main.main();


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvQ29ubmVjdGlvblNvY2tldC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9EYXRhYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9Mb2cudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9jb25uZWN0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF3QjtBQUV4QjtJQUFBO0lBcUJBLENBQUM7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Q29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBMb2cgZnJvbSBcIi4vTG9nXCI7XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU29ja2V0IHtcclxuICBzdGF0aWMgaW5pdFNlcnZlciA9IChwb3J0OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKSgpO1xyXG4gICAgLy9XaGVuIGEgc29ja2V0IGdldCBjb25uZWN0ZWRcclxuICAgIGlvLm9uKFwiY29ubmVjdGlvblwiLCAoc29ja2V0OiBhbnkpID0+IHtcclxuICAgICAgTG9nLmFkZExvZyhcclxuICAgICAgICBzb2NrZXQucmVxdWVzdC5jb25uZWN0aW9uLnJlbW90ZUFkZHJlc3MsXHJcbiAgICAgICAgXCJzZXJ2ZXJcIixcclxuICAgICAgICBcInVuZGVmaW5lZFwiLFxyXG4gICAgICAgIFwiU09DS0VUX0NPTk5FQ1RJT05fRVNUQUJMSVNIRURcIlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICAvL0xpc3RlbmluZyB0byB0aGUgcG9ydFxyXG4gICAgaW8ubGlzdGVuKHBvcnQpO1xyXG4gICAgTG9nLmFkZExvZyhcclxuICAgICAgXCJjb25uZWN0aW9uX3NvY2tldFwiLFxyXG4gICAgICBcInNlcnZlclwiLFxyXG4gICAgICBcInVuZGVmaW5lZFwiLFxyXG4gICAgICBcIkNPTk5FQ1RJT05fRVNUQUJMSVNFRF9PTl9QT1JUOlwiICsgcG9ydFxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25uZWN0aW9uU29ja2V0O1xyXG4iLCJpbXBvcnQgTG9nIGZyb20gXCIuL0xvZ1wiO1xyXG5pbXBvcnQgKiBhcyBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcclxuaW1wb3J0IHsgREFUQUJBU0VfVVJMIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9jb25uZWN0aW9uc1wiO1xyXG5cclxuY2xhc3MgRGF0YWJhc2Uge1xyXG4gIHB1YmxpYyBzdGF0aWMgaW5pdERhdGFiYXNlID0gKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xyXG4gICAgcmV0dXJuIG1vbmdvb3NlLmNvbm5lY3QoXHJcbiAgICAgIERBVEFCQVNFX1VSTCxcclxuICAgICAgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSxcclxuICAgICAgKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBMb2cuYWRkRXJyb3IoZXJyKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgTG9nLmFkZExvZyhcImRhdGFiYXNlXCIsIFwic2VydmVyXCIsIFwiYWRtaW5cIiwgXCJEQVRBQkFTRV9DT05ORUNURURcIik7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGF0YWJhc2U7XHJcbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG4vKipcclxuICogQ2xhc3MgdG8gYWRkIGxvZyBmaWxlcyBhbmQgdG8gc2hvdyBsb2dnaW5nIG9uIGNvbnNvbGVcclxuICovXHJcbmNsYXNzIExvZyB7XHJcbiAgLyoqXHJcbiAgICogTG9nZ2luZyBkYXRhIHRvIGZpbGVcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGZpbGVOYW1lIG5hbWUgb2YgdGhlIGZpbGUgdG8gYmUgbG9nZ2VkXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBwYXRoIHBhdGggb2YgdGhlIGZpbGUgdG8gYmUgc2F2ZWRcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gd2V0aGVyIHRoZSBzYXZlIHN1Y2Nlc3NmdWxsIG9yIG5vdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGxvZ1RvRmlsZSA9IChcclxuICAgIGZpbGVOYW1lOiBzdHJpbmcsXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICByZWNvcmQ6IHN0cmluZ1xyXG4gICk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xyXG4gICAgcmVjb3JkID0gXCJcXG5cIiArIHJlY29yZDtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGZzLmFwcGVuZEZpbGUocGF0aCArIGZpbGVOYW1lLCByZWNvcmQsIChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIGNyYWVhdGVzIGEgc3RhbmRhcmQgcmVjb3JkIHRvIGJlIHNhdmVkXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBzZW5kZXIgc2VuZGVyIG9mIHRoZSBkYXRhXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSByZWNpZXZlciByZWNpZXZlciBvZiB0aGUgZGF0YSBjbGllbnRcclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGRhdGEgZGF0YSB0byBiZSBzYXZlZFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJlY29yZCBhcyBhIHN0cmluZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGNyZWF0ZVJlY29yZCA9IChcclxuICAgIHNlbmRlcjogc3RyaW5nLFxyXG4gICAgcmVjaWV2ZXI6IHN0cmluZyxcclxuICAgIGRhdGE6IHN0cmluZyxcclxuICAgIHVzZXIgPSBcInVua25vd25cIlxyXG4gICk6IHN0cmluZyA9PiB7XHJcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdGltZVN0cmluZyA9IHRpbWUudG9Mb2NhbGVTdHJpbmcoKS50b1N0cmluZygpO1xyXG5cclxuICAgIGxldCBzdHIgPSBgJHt0aW1lU3RyaW5nfVxcdCR7c2VuZGVyfVxcdCR7cmVjaWV2ZXJ9XFx0JHt1c2VyfVxcdCR7ZGF0YX1gO1xyXG5cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gY3JhZWF0ZXMgYSBzdGFuZGFyZCByZWNvcmQgaW4gY29uc29sZVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc2VuZGVyIHNlbmRlciBvZiB0aGUgZGF0YVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gcmVjaWV2ZXIgcmVjaWV2ZXIgb2YgdGhlIGRhdGEgY2xpZW50XHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBkYXRhIGRhdGEgdG8gYmUgc2F2ZWRcclxuICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyBjb25zb2xlUmVjb3JkID0gKFxyXG4gICAgc2VuZGVyOiBzdHJpbmcsXHJcbiAgICByZWNpZXZlcjogc3RyaW5nLFxyXG4gICAgZGF0YTogc3RyaW5nXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgXCJcXHgxYlszM21cIiArXHJcbiAgICAgICAgdGltZVxyXG4gICAgICAgICAgLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAucGFkRW5kKDI1LCBcIiBcIikgK1xyXG4gICAgICAgIFwiXFx4MWJbMG1cIiArXHJcbiAgICAgICAgXCJcXHgxYlszNG1cIiArXHJcbiAgICAgICAgc2VuZGVyLnBhZEVuZCgyNSwgXCIgXCIpICtcclxuICAgICAgICBcIlxceDFiWzM1bVwiICtcclxuICAgICAgICByZWNpZXZlci5wYWRFbmQoMjUsIFwiIFwiKSArXHJcbiAgICAgICAgXCJcXHgxYlszNm1cIiArXHJcbiAgICAgICAgZGF0YS5wYWRFbmQoNDUsIFwiIFwiKSArXHJcbiAgICAgICAgXCJcXHgxYlswbVwiXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gZXJyb3IgcmVjb3JkXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBlcnJvciBlcnJvciB0byBiZSBzYXZlZFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlRXJyb3JTdHJpbmcgPSAoZXJyb3I6IEVycm9yKTogc3RyaW5nID0+IHtcclxuICAgIGxldCB0aW1lID0gbmV3IERhdGUoKTtcclxuICAgIGxldCB0aW1lU3RyaW5nID0gdGltZS50b0xvY2FsZVN0cmluZygpLnRvU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gdGltZVN0cmluZyArIFwiXFx0XCIgKyBlcnJvci5tZXNzYWdlO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGNvbnNvbGVFcnJvciA9IChlcnJvcjogRXJyb3IpOiB2b2lkID0+IHtcclxuICAgIGxldCB0aW1lID0gbmV3IERhdGUoKTtcclxuICAgIGxldCB0aW1lU3RyaW5nID0gdGltZS50b0xvY2FsZVN0cmluZygpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIFwiXFx4MWJbMzRtXCIgKyB0aW1lU3RyaW5nICsgXCJcXHgxYlszMW0gRVJST1I6OjogXCIgKyBlcnJvci5tZXNzYWdlICsgXCJcXHgxYlswbVwiXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc2VuZGVyIHNlbmRlciBvZiB0aGUgZGF0YVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gcmVjaWV2ZXIgcmVjaXZlciBvZiB0aGUgZGF0YVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdXNlcj1cInVua25vd25cIiB1c2VyIGludm9sdmVkXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBkYXRhIGRhdGEgdG8gYmUgc2VudFxyXG4gICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgYWRkTG9nID0gKFxyXG4gICAgc2VuZGVyOiBzdHJpbmcsXHJcbiAgICByZWNpZXZlcjogc3RyaW5nLFxyXG4gICAgdXNlciA9IFwidW5rbm93blwiLFxyXG4gICAgZGF0YTogc3RyaW5nXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdGltZVN0cmluZyA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX1fJHt0aW1lLmdldE1vbnRoKCl9XyR7dGltZS5nZXREYXRlKCl9YDtcclxuICAgIGxldCBmb2xkZXJOYW1lID0gXCIuL2xvZ3MvXCIgKyB0aW1lU3RyaW5nICsgXCIvXCI7XHJcblxyXG4gICAgZnMuZXhpc3RzKGZvbGRlck5hbWUsIGV4aXN0ID0+IHtcclxuICAgICAgaWYgKGV4aXN0KSB7XHJcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gdGltZVN0cmluZyArIGAgJHt0aW1lLmdldEhvdXJzKCl9X2xvZy50eHRgO1xyXG5cclxuICAgICAgICBMb2cubG9nVG9GaWxlKFxyXG4gICAgICAgICAgZmlsZU5hbWUsXHJcbiAgICAgICAgICBmb2xkZXJOYW1lLFxyXG4gICAgICAgICAgTG9nLmNyZWF0ZVJlY29yZChzZW5kZXIsIHJlY2lldmVyLCBkYXRhLCB1c2VyKVxyXG4gICAgICAgICkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKExvZy5jcmVhdGVFcnJvclN0cmluZyhlcnIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmcy5ta2Rpcihmb2xkZXJOYW1lLCAoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgbGV0IGZpbGVOYW1lID0gdGltZVN0cmluZyArIGAgJHt0aW1lLmdldEhvdXJzKCl9X2xvZy50eHRgO1xyXG4gICAgICAgICAgICBMb2cubG9nVG9GaWxlKFxyXG4gICAgICAgICAgICAgIGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgIGZvbGRlck5hbWUsXHJcbiAgICAgICAgICAgICAgTG9nLmNyZWF0ZVJlY29yZChzZW5kZXIsIHJlY2lldmVyLCBkYXRhLCB1c2VyKVxyXG4gICAgICAgICAgICApLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTG9nLmNyZWF0ZUVycm9yU3RyaW5nKGVycikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzo6OiBIYW5kbGUgZXJyb3JcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgTG9nLmNvbnNvbGVSZWNvcmQoc2VuZGVyLCByZWNpZXZlciwgZGF0YSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtICB7c3RyaW5nfSBlcnJvciBlcnJvciB0byBiZSByZWNvcmRlZFxyXG4gICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgYWRkRXJyb3IgPSAoZXJyb3I6IEVycm9yKTogdm9pZCA9PiB7XHJcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdGltZVN0cmluZyA9IGAke3RpbWUuZ2V0RnVsbFllYXIoKX1fJHt0aW1lLmdldE1vbnRoKCl9XyR7dGltZS5nZXREYXRlKCl9YDtcclxuICAgIGxldCBmb2xkZXJOYW1lID0gXCIuL2xvZ3MvXCIgKyB0aW1lU3RyaW5nICsgXCIvXCI7XHJcblxyXG4gICAgZnMuZXhpc3RzKGZvbGRlck5hbWUsIGV4aXN0ID0+IHtcclxuICAgICAgaWYgKGV4aXN0KSB7XHJcbiAgICAgICAgbGV0IGZpbGVOYW1lID0gdGltZVN0cmluZyArIGAgJHt0aW1lLmdldEhvdXJzKCl9X2Vycm9yLnR4dGA7XHJcblxyXG4gICAgICAgIExvZy5sb2dUb0ZpbGUoZmlsZU5hbWUsIGZvbGRlck5hbWUsIExvZy5jcmVhdGVFcnJvclN0cmluZyhlcnJvcikpLmNhdGNoKFxyXG4gICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coTG9nLmNyZWF0ZUVycm9yU3RyaW5nKGVycikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZnMubWtkaXIoZm9sZGVyTmFtZSwgKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWxlTmFtZSA9IHRpbWVTdHJpbmcgKyBgICR7dGltZS5nZXRIb3VycygpfV9lcnJvci50eHRgO1xyXG4gICAgICAgICAgICBMb2cubG9nVG9GaWxlKFxyXG4gICAgICAgICAgICAgIGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgIGZvbGRlck5hbWUsXHJcbiAgICAgICAgICAgICAgTG9nLmNyZWF0ZUVycm9yU3RyaW5nKGVycm9yKVxyXG4gICAgICAgICAgICApLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coTG9nLmNyZWF0ZUVycm9yU3RyaW5nKGVycikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzo6OiBIYW5kbGUgZXJyb3JcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgTG9nLmNvbnNvbGVFcnJvcihlcnJvcik7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9nO1xyXG4iLCIvL2RhdGFiYXNlIG5hbWVcclxuY29uc3QgREFUQUJBU0VfTkFNRTogc3RyaW5nID0gXCJtYXRlcmlhbF9kZXNpZ25lcl90ZXN0MDFcIjtcclxuXHJcbi8vRGF0YWJhc2UgY29ubmVjdGlvbiB1cmxcclxuZXhwb3J0IGNvbnN0IERBVEFCQVNFX1VSTDogc3RyaW5nID1cclxuICBcIm1vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvXCIgKyBEQVRBQkFTRV9OQU1FO1xyXG5cclxuLy9jb2xsZWN0aW9uIG9mIHVzZXJzXHJcbmV4cG9ydCBjb25zdCBVU0VSX0RBVEFCQVNFOiBzdHJpbmcgPSBcInVzZXJzXCI7XHJcblxyXG4vL1NvY2tldC5pbyBjb25uZWN0aW9uIHBvcnRcclxuZXhwb3J0IGNvbnN0IFNPQ0tFVF9DT05ORUNUSU9OX1BPUlQgPSA5OTAwO1xyXG4iLCJpbXBvcnQgTG9nIGZyb20gXCIuL2NsYXNzZXMvTG9nXCI7XG5pbXBvcnQgQ29ubmVjdGlvblNvY2tldCBmcm9tIFwiLi9jbGFzc2VzL0Nvbm5lY3Rpb25Tb2NrZXRcIjtcbmltcG9ydCBEYXRhYmFzZSBmcm9tIFwiLi9jbGFzc2VzL0RhdGFiYXNlXCI7XG5pbXBvcnQgeyBTT0NLRVRfQ09OTkVDVElPTl9QT1JUIH0gZnJvbSBcIi4vY29uc3RhbnRzL2Nvbm5lY3Rpb25zXCI7XG5cbmNsYXNzIE1haW4ge1xuICBwdWJsaWMgc3RhdGljIG1haW4gPSAoKTogdm9pZCA9PiB7XG4gICAgTG9nLmFkZExvZyhcInNlcnZlclwiLCBcImFkbWluXCIsIFwidW5rbm93blwiLCBcIlNFUlZFUl9SRVNUQVJUXCIpO1xuICAgIERhdGFiYXNlLmluaXREYXRhYmFzZSgpO1xuICAgIENvbm5lY3Rpb25Tb2NrZXQuaW5pdFNlcnZlcihTT0NLRVRfQ09OTkVDVElPTl9QT1JUKTtcbiAgfTtcbn1cblxuY29uc29sZS5sb2coXCJTdGFydGluZyB0aGUgc2VydmVyXCIpO1xuTWFpbi5tYWluKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==