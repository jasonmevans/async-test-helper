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

var trueFn = function trueFn() {
  return true;
};

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
  return waitFor(trueFn, 0, task)();
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
    return Promise.race([new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        reject(new TimeoutError(timeout));
      }, timeout);
    }), new Promise(function (resolve, reject) {
      // todo: refactor this to get rid of the branch between types
      if (typeof condition === 'number') {
        var _timeout = window.setTimeout(function () {
          try {
            // todo: update documentation for passing args
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
  return waitFor(trueFn, 1, task);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhM2QyMTY0MTQzNzllOGFjOGU1MCIsIndlYnBhY2s6Ly8vLi9Bc3luY1Rlc3RIZWxwZXIuanMiXSwibmFtZXMiOlsidHJ1ZUZuIiwic3RhcnRXaXRoIiwidGFzayIsIndhaXRGb3IiLCJjb25kaXRpb24iLCJjb25kaXRvbkludGVydmFsIiwidGltZW91dCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNvbnRleHQiLCJhcmdzIiwiUHJvbWlzZSIsInJhY2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid2luZG93Iiwic2V0VGltZW91dCIsIlRpbWVvdXRFcnJvciIsImFwcGx5IiwiZSIsIlRhc2tFcnJvciIsIm1lc3NhZ2UiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY29uZGl0aW9uU2F0aXNmaWVkIiwiY2xlYXJJbnRlcnZhbCIsIkNvbmRpdGlvbkVycm9yIiwiZG9UaGlzIiwiQXN5bmNFcnJvciIsIkVycm9yIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYXB0dXJlU3RhY2tUcmFjZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhE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QU07QUFBQTs7QUFBQSxtSkFDVkEsSUFEVTs7QUFHbkIsUUFBSW1CLE1BQU1DLFNBQU4sQ0FBZ0JDLGNBQWhCLENBQStCLG1CQUEvQixDQUFKLEVBQ0VGLE1BQU1HLGlCQUFOLFFBQThCZixZQUE5QjtBQUppQjtBQUtwQjs7O3FCQU5zQlksSzs7SUFRbkJaLFk7OztBQUNKLHdCQUFZWCxPQUFaLEVBQXFCO0FBQUE7O0FBQUEseUpBQ21CQSxPQURuQjtBQUVwQjs7O0VBSHdCc0IsVTs7SUFLckJGLGM7Ozs7Ozs7Ozs7RUFBdUJFLFU7O0lBQ3ZCUixTOzs7Ozs7Ozs7O0VBQWtCUSxVOztRQUVmM0IsUyxHQUFBQSxTO1FBQVdFLE8sR0FBQUEsTztRQUFTd0IsTSxHQUFBQSxNO1FBQVFWLFksR0FBQUEsWTtRQUFjUyxjLEdBQUFBLGM7UUFBZ0JOLFMsR0FBQUEsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYXN5bmMtdGVzdC1oZWxwZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXN5bmMtdGVzdC1oZWxwZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXN5bmMtdGVzdC1oZWxwZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTNkMjE2NDE0Mzc5ZThhYzhlNTAiLCJjb25zdCB0cnVlRm4gPSAoKSA9PiB0cnVlO1xuXG4vKipcbiAqIEFzIHRoZSBmdW5jdGlvbiBuYW1lIGltcGxpZXMsIHRoaXMgaXMgd2hlcmUgeW91IHN0YXJ0LiBUaGlzIGZ1bmN0aW9uXG4gKiByZXR1cm5zIHRoZSBQcm9taXNlIHdyYXBwZWQgYnkgdGhlIGB3YWl0Rm9yYCBmdW5jdGlvbiwgYW5kIGltbWVkaWF0ZWx5XG4gKiByZXNvbHZlcyB0aGUgUHJvbWlzZSB3aXRoIHRoZSB2YWx1ZSByZXR1cm5lZCBieSB0aGUgcGFzc2VkIGluIHRhc2tcbiAqIGZ1bmN0aW9uLiBXaGlsZSBgd2FpdEZvcmAgbm9ybWFsbHkgYWNjZXB0cyBhIGNvbmRpdGlvbiBmdW5jdGlvbiBmb3JcbiAqIHRlc3Rpbmcgd2l0aGluIHRoZSBlbmNsb3NlZCBpbnRlcnZhbCwgdGhlIGBzdGFydFdpdGhgIGZ1bmN0aW9uIHN1cHBsaWVzXG4gKiB0aGUgY29uZGl0aW9uIGFzIGAoKSA9PiB0cnVlYCB0byBpbW1lZGlhdGVseSByZXNvbHZlIHRoZSB3cmFwcGVkIFByb21pc2UuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGFzayBBIGZ1bmN0aW9uIHJlcHJlc2VudGluZyB0aGUgc3RhcnRpbmcgdGFzay5cbiAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIEEgUHJvbWlzZSBvZiB0aGUgdmFsdWUgb2YgdGhlIHN0YXJ0aW5nIHRhc2suXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0V2l0aCh0YXNrKSB7XG4gIHJldHVybiB3YWl0Rm9yKHRydWVGbiwgMCwgdGFzaykoKTtcbn1cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGEgY29uZGl0aW9uIG9uIGFuIGludGVydmFsLCBhbmQgb3B0aW9uYWxseSBydW5zIGFcbiAqIHRhc2sgYWZ0ZXJ3YXJkLiBJbnRlcm5hbGx5LCB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIGZ1bmN0aW9uIHJldHVybmluZyBhXG4gKiBQcm9taXNlIG9mIHRoZSBjb25kaXRpb24gYmVpbmcgdHJ1ZSwgYW5kIHRoZSBvcHRpb25hbCB0YXNrJ3MgcmV0dXJuIHZhbHVlIGlzXG4gKiBwYXNzZWQgaW50byB0aGUgUHJvbWlzZSdzIHJlc29sdmUgZnVuY3Rpb24gYWxsb3dpbmcgdGhlIHZhbHVlIHRvIGJlIHVzZWRcbiAqIGxhdGVyIGluIHRoZSBQcm9taXNlIGNoYWluLiBUaGUgc2VtYW50aWNzIG9mIHRoZSBmdW5jdGlvbiBtYWtlIGl0IHBhc3NhYmxlXG4gKiBpbnRvIHRoZSBgdGhlbmAgbWV0aG9kIG9mIGEgUHJvbWlzZSBvYmplY3QuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY29uZGl0aW9uICAgICAgICAgICAgVGhlIHRlc3QgY29uZGl0aW9uIGZ1bmN0aW9uIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zIGEgYm9vbGVhblxuICogQHBhcmFtICB7TnVtYmVyfSBbY29uZGl0b25JbnRlcnZhbD0xMDBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXR3ZWVuIHRlc3RpbmcgdGhlIGNvbmRpdGlvblxuICogQHBhcmFtICB7RnVuY3Rpb259IFt0YXNrPW51bGxdICAgICAgICAgIEFuIG9wdGlvbmFsIHRhc2sgZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gdGhlIGNvbmRpdGlvbiBpcyB0cnVlLiBUaGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgb2YgdGhlIHRhc2sgaXMgcGFzc2VkIHRvXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGludGVybmFsIFByb21pc2UncyByZXNvbHZlLlxuICogQHJldHVybiB7RnVuY3Rpb259ICAgICAgICAgICAgICAgICAgICAgIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBjb25kaXRpb24gZnVuY3Rpb24gYmVpbmcgdHJ1ZS5cbiAqL1xuZnVuY3Rpb24gd2FpdEZvcihjb25kaXRpb24sIGNvbmRpdG9uSW50ZXJ2YWwgPSAxMDAsIHRhc2sgPSBudWxsLCB0aW1lb3V0ID0gMTAwMDApIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMiAmJiB0eXBlb2YgY29uZGl0b25JbnRlcnZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGFzayA9IGNvbmRpdG9uSW50ZXJ2YWw7XG4gICAgY29uZGl0b25JbnRlcnZhbCA9IDEwMDtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBQcm9taXNlLnJhY2UoW1xuXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlamVjdChuZXcgVGltZW91dEVycm9yKHRpbWVvdXQpKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICB9KSxcblxuICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyB0b2RvOiByZWZhY3RvciB0aGlzIHRvIGdldCByaWQgb2YgdGhlIGJyYW5jaCBiZXR3ZWVuIHR5cGVzXG4gICAgICAgIGlmICh0eXBlb2YgY29uZGl0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyB0b2RvOiB1cGRhdGUgZG9jdW1lbnRhdGlvbiBmb3IgcGFzc2luZyBhcmdzXG4gICAgICAgICAgICAgIHJlc29sdmUodGFzayAmJiB0YXNrLmFwcGx5KGNvbnRleHQsIGFyZ3MpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUYXNrRXJyb3IoZS5tZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgY29uZGl0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29uZGl0aW9uU2F0aXNmaWVkID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25kaXRpb25TYXRpc2ZpZWQgPSBjb25kaXRpb24oKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICByZWplY3QobmV3IENvbmRpdGlvbkVycm9yKGUubWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvblNhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRhc2sgJiYgdGFzay5hcHBseShjb250ZXh0LCBhcmdzKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUYXNrRXJyb3IoZS5tZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgY29uZGl0b25JbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICBdKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNpbXBsZSB0YXNrIGZ1bmN0aW9uLiBUaGUgZnVuY3Rpb24gY2FsbHMgYHdhaXRGb3JgIGludGVybmFsbHksIHNvIGl0XG4gKiBzaW1wbHkgcmV0dXJucyBhIGZ1bmN0aW9uIHJldHVybmluZyBhIFByb21pc2UuIExpa2UgYHN0YXJ0V2l0aGAsIHRoaXNcbiAqIGZ1bmN0aW9uIHN1cHBsaWVzIGAoKSA9PiB0cnVlYCBhcyB0aGUgY29uZGl0aW9uIGNhdXNpbmcgdGhlIGludGVybmFsXG4gKiBQcm9taXNlIHRvIHJlc29sdmUgaW1tZWRpYXRlbHkuIFRoZSBpbnRlcnZhbCBpcyBzdXBwbGllZCBhcyBgMWAgdG8gbWFrZSB0aGVcbiAqIHJlc29sdXRpb24gaGFwcGVuIG9uIHRoZSBuZXh0IHRpY2sgYWZ0ZXIgb25lIG1pbGxpc2Vjb25kLiBUaGUgc2VtYW50aWNzIG9mXG4gKiB0aGUgZnVuY3Rpb24gbWFrZSBpdCBwYXNzYWJsZSBpbnRvIHRoZSBgdGhlbmAgbWV0aG9kIG9mIGEgUHJvbWlzZSBvYmplY3QuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gIHRhc2sgVGhlIHRhc2sgZnVuY3Rpb24gdG8gcnVuLiBFeGVjdXRlcyBhZnRlciAxbXNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgICAgICBSZXR1cm5zIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgMW1zLlxuICovXG5mdW5jdGlvbiBkb1RoaXModGFzaykge1xuICByZXR1cm4gd2FpdEZvcih0cnVlRm4sIDEsIHRhc2spO1xufVxuXG5jbGFzcyBBc3luY0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICBpZiAoRXJyb3IucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdjYXB0dXJlU3RhY2tUcmFjZScpKVxuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgVGltZW91dEVycm9yKTtcbiAgfVxufVxuY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgQXN5bmNFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHRpbWVvdXQpIHtcbiAgICBzdXBlcihgRXhjZWVkZWQgYXN5bmMgd2FpdCB0aW1lb3V0OiAke3RpbWVvdXR9YCk7XG4gIH1cbn1cbmNsYXNzIENvbmRpdGlvbkVycm9yIGV4dGVuZHMgQXN5bmNFcnJvciB7fVxuY2xhc3MgVGFza0Vycm9yIGV4dGVuZHMgQXN5bmNFcnJvciB7fVxuXG5leHBvcnQgeyBzdGFydFdpdGgsIHdhaXRGb3IsIGRvVGhpcywgVGltZW91dEVycm9yLCBDb25kaXRpb25FcnJvciwgVGFza0Vycm9yIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9Bc3luY1Rlc3RIZWxwZXIuanMiXSwic291cmNlUm9vdCI6IiJ9