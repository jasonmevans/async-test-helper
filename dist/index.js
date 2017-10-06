(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("async-test-helper", [], factory);
	else if(typeof exports === 'object')
		exports["async-test-helper"] = factory();
	else
		root["async-test-helper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

/**
 * As the function name implies, this is where you start. This function
 * returns the Promise wrapped by the `waitFor` function, and immediately
 * resolves the Promise with the value returned by the passed in task
 * function. While `waitFor` normally accepts a condition function for
 * testing within the enclosed interval, the `startWith` function supplies
 * the condition as `() => true` to immediately resolve the wrapped Promise.
 * @param  {Function} task A function representing the starting task.
 * @return {Promise}       A Promise of the value of the starting task.
 */
function startWith(task) {
  return waitFor(0, task)();
}

/**
 * A function that checks a condition on an interval, and optionally runs a
 * task afterward. Internally, the function returns a function returning a
 * Promise of the condition being true, and the optional task's return value is
 * passed into the Promise's resolve function allowing the value to be used
 * later in the Promise chain. The semantics of the function make it passable
 * into the `then` method of a Promise object.
 * @param  {Function} condition            The test condition function that
 *                                         returns a boolean
 * @param  {Number} [conditonInterval=100] The number of milliseconds to wait
 *                                         between testing the condition
 * @param  {Function} [task=null]          An optional task function to execute
 *                                         when the condition is true. The
 *                                         return value of the task is passed to
 *                                         the internal Promise's resolve.
 * @return {Function}                      A function that returns a Promise of
 *                                         the condition function being true.
 */
function waitFor(condition) {
  var conditonInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var task = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;

  if (arguments.length == 2 && typeof conditonInterval == 'function') {
    task = conditonInterval;
    conditonInterval = 100;
  }
  return function () {
    var context = this,
        args = arguments;
    return Promise.race([

    // todo: document timeout behavior
    new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        reject(new TimeoutError(timeout));
      }, timeout);
    }), new Promise(function (resolve, reject) {
      // todo: refactor this to get rid of the branch between types
      if (typeof condition === 'number') {
        var _timeout = window.setTimeout(function () {
          try {
            // todo: update documentation for passing args among tasks
            resolve(task && task.apply(context, args));
          } catch (e) {
            reject(new TaskError(e.message));
          }
        }, condition);
      } else {
        var interval = window.setInterval(function () {
          var conditionSatisfied = false;
          try {
            conditionSatisfied = condition();
          } catch (e) {
            window.clearInterval(interval);
            reject(new ConditionError(e.message));
          }
          try {
            if (conditionSatisfied) {
              window.clearInterval(interval);
              resolve(task && task.apply(context, args));
            }
          } catch (e) {
            window.clearInterval(interval);
            reject(new TaskError(e.message));
          }
        }, conditonInterval);
      }
    })]);
  };
}

/**
 * A simple task function. The function calls `waitFor` internally, so it
 * simply returns a function returning a Promise. Like `startWith`, this
 * function supplies `() => true` as the condition causing the internal
 * Promise to resolve immediately. The interval is supplied as `1` to make the
 * resolution happen on the next tick after one millisecond. The semantics of
 * the function make it passable into the `then` method of a Promise object.
 * @param  {Function}  task The task function to run. Executes after 1ms
 * @return {Function}       Returns a function returning a Promise that resolves
 *                          after 1ms.
 */
function doThis(task) {
  return waitFor(1, task);
}

var AsyncError = function (_extendableBuiltin2) {
  _inherits(AsyncError, _extendableBuiltin2);

  function AsyncError() {
    var _ref;

    _classCallCheck(this, AsyncError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = AsyncError.__proto__ || Object.getPrototypeOf(AsyncError)).call.apply(_ref, [this].concat(args)));

    if (Error.prototype.hasOwnProperty('captureStackTrace')) Error.captureStackTrace(_this, TimeoutError);
    return _this;
  }

  return AsyncError;
}(_extendableBuiltin(Error));

var TimeoutError = function (_AsyncError) {
  _inherits(TimeoutError, _AsyncError);

  function TimeoutError(timeout) {
    _classCallCheck(this, TimeoutError);

    return _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'Exceeded async wait timeout: ' + timeout));
  }

  return TimeoutError;
}(AsyncError);

var ConditionError = function (_AsyncError2) {
  _inherits(ConditionError, _AsyncError2);

  function ConditionError() {
    _classCallCheck(this, ConditionError);

    return _possibleConstructorReturn(this, (ConditionError.__proto__ || Object.getPrototypeOf(ConditionError)).apply(this, arguments));
  }

  return ConditionError;
}(AsyncError);

var TaskError = function (_AsyncError3) {
  _inherits(TaskError, _AsyncError3);

  function TaskError() {
    _classCallCheck(this, TaskError);

    return _possibleConstructorReturn(this, (TaskError.__proto__ || Object.getPrototypeOf(TaskError)).apply(this, arguments));
  }

  return TaskError;
}(AsyncError);

exports.startWith = startWith;
exports.waitFor = waitFor;
exports.doThis = doThis;
exports.TimeoutError = TimeoutError;
exports.ConditionError = ConditionError;
exports.TaskError = TaskError;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZDljMDg0ZmRiY2Y2OTM1YzE2MiIsIndlYnBhY2s6Ly8vLi9Bc3luY1Rlc3RIZWxwZXIuanMiXSwibmFtZXMiOlsic3RhcnRXaXRoIiwidGFzayIsIndhaXRGb3IiLCJjb25kaXRpb24iLCJjb25kaXRvbkludGVydmFsIiwidGltZW91dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNvbnRleHQiLCJhcmdzIiwiUHJvbWlzZSIsInJhY2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2luZG93Iiwic2V0VGltZW91dCIsIlRpbWVvdXRFcnJvciIsImFwcGx5IiwiZSIsIlRhc2tFcnJvciIsIm1lc3NhZ2UiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY29uZGl0aW9uU2F0aXNmaWVkIiwiY2xlYXJJbnRlcnZhbCIsIkNvbmRpdGlvbkVycm9yIiwiZG9UaGlzIiwiQXN5bmNFcnJvciIsIkVycm9yIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYXB0dXJlU3RhY2tUcmFjZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFB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RixNQUFNRyxpQkFBTixRQUE4QmYsWUFBOUI7QUFKaUI7QUFLcEI7OztxQkFOc0JZLEs7O0lBUW5CWixZOzs7QUFDSix3QkFBWVgsT0FBWixFQUFxQjtBQUFBOztBQUFBLHlKQUNtQkEsT0FEbkI7QUFFcEI7OztFQUh3QnNCLFU7O0lBS3JCRixjOzs7Ozs7Ozs7O0VBQXVCRSxVOztJQUN2QlIsUzs7Ozs7Ozs7OztFQUFrQlEsVTs7UUFFZjNCLFMsR0FBQUEsUztRQUFXRSxPLEdBQUFBLE87UUFBU3dCLE0sR0FBQUEsTTtRQUFRVixZLEdBQUFBLFk7UUFBY1MsYyxHQUFBQSxjO1FBQWdCTixTLEdBQUFBLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFzeW5jLXRlc3QtaGVscGVyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFzeW5jLXRlc3QtaGVscGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFzeW5jLXRlc3QtaGVscGVyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZkOWMwODRmZGJjZjY5MzVjMTYyIiwiLyoqXG4gKiBBcyB0aGUgZnVuY3Rpb24gbmFtZSBpbXBsaWVzLCB0aGlzIGlzIHdoZXJlIHlvdSBzdGFydC4gVGhpcyBmdW5jdGlvblxuICogcmV0dXJucyB0aGUgUHJvbWlzZSB3cmFwcGVkIGJ5IHRoZSBgd2FpdEZvcmAgZnVuY3Rpb24sIGFuZCBpbW1lZGlhdGVseVxuICogcmVzb2x2ZXMgdGhlIFByb21pc2Ugd2l0aCB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlIHBhc3NlZCBpbiB0YXNrXG4gKiBmdW5jdGlvbi4gV2hpbGUgYHdhaXRGb3JgIG5vcm1hbGx5IGFjY2VwdHMgYSBjb25kaXRpb24gZnVuY3Rpb24gZm9yXG4gKiB0ZXN0aW5nIHdpdGhpbiB0aGUgZW5jbG9zZWQgaW50ZXJ2YWwsIHRoZSBgc3RhcnRXaXRoYCBmdW5jdGlvbiBzdXBwbGllc1xuICogdGhlIGNvbmRpdGlvbiBhcyBgKCkgPT4gdHJ1ZWAgdG8gaW1tZWRpYXRlbHkgcmVzb2x2ZSB0aGUgd3JhcHBlZCBQcm9taXNlLlxuICogQHBhcmFtICB7RnVuY3Rpb259IHRhc2sgQSBmdW5jdGlvbiByZXByZXNlbnRpbmcgdGhlIHN0YXJ0aW5nIHRhc2suXG4gKiBAcmV0dXJuIHtQcm9taXNlfSAgICAgICBBIFByb21pc2Ugb2YgdGhlIHZhbHVlIG9mIHRoZSBzdGFydGluZyB0YXNrLlxuICovXG5mdW5jdGlvbiBzdGFydFdpdGgodGFzaykge1xuICByZXR1cm4gd2FpdEZvcigwLCB0YXNrKSgpO1xufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBjaGVja3MgYSBjb25kaXRpb24gb24gYW4gaW50ZXJ2YWwsIGFuZCBvcHRpb25hbGx5IHJ1bnMgYVxuICogdGFzayBhZnRlcndhcmQuIEludGVybmFsbHksIHRoZSBmdW5jdGlvbiByZXR1cm5zIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFcbiAqIFByb21pc2Ugb2YgdGhlIGNvbmRpdGlvbiBiZWluZyB0cnVlLCBhbmQgdGhlIG9wdGlvbmFsIHRhc2sncyByZXR1cm4gdmFsdWUgaXNcbiAqIHBhc3NlZCBpbnRvIHRoZSBQcm9taXNlJ3MgcmVzb2x2ZSBmdW5jdGlvbiBhbGxvd2luZyB0aGUgdmFsdWUgdG8gYmUgdXNlZFxuICogbGF0ZXIgaW4gdGhlIFByb21pc2UgY2hhaW4uIFRoZSBzZW1hbnRpY3Mgb2YgdGhlIGZ1bmN0aW9uIG1ha2UgaXQgcGFzc2FibGVcbiAqIGludG8gdGhlIGB0aGVuYCBtZXRob2Qgb2YgYSBQcm9taXNlIG9iamVjdC5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjb25kaXRpb24gICAgICAgICAgICBUaGUgdGVzdCBjb25kaXRpb24gZnVuY3Rpb24gdGhhdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnMgYSBib29sZWFuXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IFtjb25kaXRvbkludGVydmFsPTEwMF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldHdlZW4gdGVzdGluZyB0aGUgY29uZGl0aW9uXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gW3Rhc2s9bnVsbF0gICAgICAgICAgQW4gb3B0aW9uYWwgdGFzayBmdW5jdGlvbiB0byBleGVjdXRlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiB0aGUgY29uZGl0aW9uIGlzIHRydWUuIFRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSBvZiB0aGUgdGFzayBpcyBwYXNzZWQgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgaW50ZXJuYWwgUHJvbWlzZSdzIHJlc29sdmUuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICAgICAgICAgICAgICAgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIG9mXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGNvbmRpdGlvbiBmdW5jdGlvbiBiZWluZyB0cnVlLlxuICovXG5mdW5jdGlvbiB3YWl0Rm9yKGNvbmRpdGlvbiwgY29uZGl0b25JbnRlcnZhbCA9IDEwMCwgdGFzayA9IG51bGwsIHRpbWVvdXQgPSAxMDAwMCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyICYmIHR5cGVvZiBjb25kaXRvbkludGVydmFsID09ICdmdW5jdGlvbicpIHtcbiAgICB0YXNrID0gY29uZGl0b25JbnRlcnZhbDtcbiAgICBjb25kaXRvbkludGVydmFsID0gMTAwO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBsZXQgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIFByb21pc2UucmFjZShbXG5cbiAgICAgIC8vIHRvZG86IGRvY3VtZW50IHRpbWVvdXQgYmVoYXZpb3JcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IodGltZW91dCkpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgIH0pLFxuXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIHRvZG86IHJlZmFjdG9yIHRoaXMgdG8gZ2V0IHJpZCBvZiB0aGUgYnJhbmNoIGJldHdlZW4gdHlwZXNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgY29uc3QgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIC8vIHRvZG86IHVwZGF0ZSBkb2N1bWVudGF0aW9uIGZvciBwYXNzaW5nIGFyZ3MgYW1vbmcgdGFza3NcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0YXNrICYmIHRhc2suYXBwbHkoY29udGV4dCwgYXJncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUYXNrRXJyb3IoZS5tZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgY29uZGl0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uU2F0aXNmaWVkID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25kaXRpb25TYXRpc2ZpZWQgPSBjb25kaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBDb25kaXRpb25FcnJvcihlLm1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGlmIChjb25kaXRpb25TYXRpc2ZpZWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0YXNrICYmIHRhc2suYXBwbHkoY29udGV4dCwgYXJncykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgVGFza0Vycm9yKGUubWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGNvbmRpdG9uSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgXSk7XG4gIH07XG59XG5cbi8qKlxuICogQSBzaW1wbGUgdGFzayBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIGNhbGxzIGB3YWl0Rm9yYCBpbnRlcm5hbGx5LCBzbyBpdFxuICogc2ltcGx5IHJldHVybnMgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBQcm9taXNlLiBMaWtlIGBzdGFydFdpdGhgLCB0aGlzXG4gKiBmdW5jdGlvbiBzdXBwbGllcyBgKCkgPT4gdHJ1ZWAgYXMgdGhlIGNvbmRpdGlvbiBjYXVzaW5nIHRoZSBpbnRlcm5hbFxuICogUHJvbWlzZSB0byByZXNvbHZlIGltbWVkaWF0ZWx5LiBUaGUgaW50ZXJ2YWwgaXMgc3VwcGxpZWQgYXMgYDFgIHRvIG1ha2UgdGhlXG4gKiByZXNvbHV0aW9uIGhhcHBlbiBvbiB0aGUgbmV4dCB0aWNrIGFmdGVyIG9uZSBtaWxsaXNlY29uZC4gVGhlIHNlbWFudGljcyBvZlxuICogdGhlIGZ1bmN0aW9uIG1ha2UgaXQgcGFzc2FibGUgaW50byB0aGUgYHRoZW5gIG1ldGhvZCBvZiBhIFByb21pc2Ugb2JqZWN0LlxuICogQHBhcmFtICB7RnVuY3Rpb259ICB0YXNrIFRoZSB0YXNrIGZ1bmN0aW9uIHRvIHJ1bi4gRXhlY3V0ZXMgYWZ0ZXIgMW1zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgUmV0dXJucyBhIGZ1bmN0aW9uIHJldHVybmluZyBhIFByb21pc2UgdGhhdCByZXNvbHZlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIDFtcy5cbiAqL1xuZnVuY3Rpb24gZG9UaGlzKHRhc2spIHtcbiAgcmV0dXJuIHdhaXRGb3IoMSwgdGFzayk7XG59XG5cbmNsYXNzIEFzeW5jRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIGlmIChFcnJvci5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2NhcHR1cmVTdGFja1RyYWNlJykpXG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBUaW1lb3V0RXJyb3IpO1xuICB9XG59XG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBBc3luY0Vycm9yIHtcbiAgY29uc3RydWN0b3IodGltZW91dCkge1xuICAgIHN1cGVyKGBFeGNlZWRlZCBhc3luYyB3YWl0IHRpbWVvdXQ6ICR7dGltZW91dH1gKTtcbiAgfVxufVxuY2xhc3MgQ29uZGl0aW9uRXJyb3IgZXh0ZW5kcyBBc3luY0Vycm9yIHt9XG5jbGFzcyBUYXNrRXJyb3IgZXh0ZW5kcyBBc3luY0Vycm9yIHt9XG5cbmV4cG9ydCB7IHN0YXJ0V2l0aCwgd2FpdEZvciwgZG9UaGlzLCBUaW1lb3V0RXJyb3IsIENvbmRpdGlvbkVycm9yLCBUYXNrRXJyb3IgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0FzeW5jVGVzdEhlbHBlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=