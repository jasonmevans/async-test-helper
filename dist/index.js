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

  if (arguments.length == 2 && typeof conditonInterval == 'function') {
    task = conditonInterval;conditonInterval = 100;
  }
  return function () {
    return new Promise(function (resolve, reject) {
      // todo: refactor this to get rid of the branch between types
      if (typeof condition === 'number') {
        var timeout = window.setTimeout(function () {
          try {
            resolve(task && task());
          } catch (e) {
            reject(e);
          }
        }, condition);
      } else {
        var interval = window.setInterval(function () {
          try {
            if (condition()) {
              window.clearInterval(interval);
              resolve(task && task());
            }
          } catch (e) {
            reject(e);
          }
        }, conditonInterval);
      }
    });
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

exports.startWith = startWith;
exports.waitFor = waitFor;
exports.doThis = doThis;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhYjAxMzg1ZjA1MjAxZjU2YTVhMyIsIndlYnBhY2s6Ly8vLi9Bc3luY1Rlc3RIZWxwZXIuanMiXSwibmFtZXMiOlsidHJ1ZUZuIiwic3RhcnRXaXRoIiwidGFzayIsIndhaXRGb3IiLCJjb25kaXRpb24iLCJjb25kaXRvbkludGVydmFsIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aW1lb3V0Iiwid2luZG93Iiwic2V0VGltZW91dCIsImUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImRvVGhpcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVM7QUFBQSxTQUFNLElBQU47QUFBQSxDQUFmOztBQUVBOzs7Ozs7Ozs7O0FBVUEsU0FBU0MsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDdkIsU0FBT0MsUUFBUUgsTUFBUixFQUFnQixDQUFoQixFQUFtQkUsSUFBbkIsR0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsU0FBU0MsT0FBVCxDQUFpQkMsU0FBakIsRUFBaUU7QUFBQSxNQUFyQ0MsZ0JBQXFDLHVFQUFsQixHQUFrQjtBQUFBLE1BQWJILElBQWEsdUVBQU4sSUFBTTs7QUFDL0QsTUFBSUksVUFBVUMsTUFBVixJQUFvQixDQUFwQixJQUF5QixPQUFPRixnQkFBUCxJQUEyQixVQUF4RCxFQUFvRTtBQUNsRUgsV0FBT0csZ0JBQVAsQ0FBeUJBLG1CQUFtQixHQUFuQjtBQUMxQjtBQUNELFNBQU8sWUFBVztBQUNoQixXQUFPLElBQUlHLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEM7QUFDQSxVQUFJLE9BQU9OLFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDakMsWUFBTU8sVUFBVUMsT0FBT0MsVUFBUCxDQUFrQixZQUFNO0FBQ3RDLGNBQUk7QUFDRkosb0JBQVFQLFFBQVFBLE1BQWhCO0FBQ0QsV0FGRCxDQUVFLE9BQU9ZLENBQVAsRUFBVTtBQUNWSixtQkFBT0ksQ0FBUDtBQUNEO0FBQ0YsU0FOZSxFQU1iVixTQU5hLENBQWhCO0FBT0QsT0FSRCxNQVFPO0FBQ0wsWUFBTVcsV0FBV0gsT0FBT0ksV0FBUCxDQUFtQixZQUFNO0FBQ3hDLGNBQUk7QUFDRixnQkFBSVosV0FBSixFQUFpQjtBQUNmUSxxQkFBT0ssYUFBUCxDQUFxQkYsUUFBckI7QUFDQU4sc0JBQVFQLFFBQVFBLE1BQWhCO0FBQ0Q7QUFDRixXQUxELENBTUEsT0FBT1ksQ0FBUCxFQUFVO0FBQ1JKLG1CQUFPSSxDQUFQO0FBQ0Q7QUFDRixTQVZnQixFQVVkVCxnQkFWYyxDQUFqQjtBQVdEO0FBQ0YsS0F2Qk0sQ0FBUDtBQXdCRCxHQXpCRDtBQTBCRDs7QUFFRDs7Ozs7Ozs7Ozs7QUFXQSxTQUFTYSxNQUFULENBQWdCaEIsSUFBaEIsRUFBc0I7QUFDcEIsU0FBT0MsUUFBUUgsTUFBUixFQUFnQixDQUFoQixFQUFtQkUsSUFBbkIsQ0FBUDtBQUNEOztRQUVRRCxTLEdBQUFBLFM7UUFBV0UsTyxHQUFBQSxPO1FBQVNlLE0sR0FBQUEsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYXN5bmMtdGVzdC1oZWxwZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXN5bmMtdGVzdC1oZWxwZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXN5bmMtdGVzdC1oZWxwZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWIwMTM4NWYwNTIwMWY1NmE1YTMiLCJjb25zdCB0cnVlRm4gPSAoKSA9PiB0cnVlO1xuXG4vKipcbiAqIEFzIHRoZSBmdW5jdGlvbiBuYW1lIGltcGxpZXMsIHRoaXMgaXMgd2hlcmUgeW91IHN0YXJ0LiBUaGlzIGZ1bmN0aW9uXG4gKiByZXR1cm5zIHRoZSBQcm9taXNlIHdyYXBwZWQgYnkgdGhlIGB3YWl0Rm9yYCBmdW5jdGlvbiwgYW5kIGltbWVkaWF0ZWx5XG4gKiByZXNvbHZlcyB0aGUgUHJvbWlzZSB3aXRoIHRoZSB2YWx1ZSByZXR1cm5lZCBieSB0aGUgcGFzc2VkIGluIHRhc2tcbiAqIGZ1bmN0aW9uLiBXaGlsZSBgd2FpdEZvcmAgbm9ybWFsbHkgYWNjZXB0cyBhIGNvbmRpdGlvbiBmdW5jdGlvbiBmb3JcbiAqIHRlc3Rpbmcgd2l0aGluIHRoZSBlbmNsb3NlZCBpbnRlcnZhbCwgdGhlIGBzdGFydFdpdGhgIGZ1bmN0aW9uIHN1cHBsaWVzXG4gKiB0aGUgY29uZGl0aW9uIGFzIGAoKSA9PiB0cnVlYCB0byBpbW1lZGlhdGVseSByZXNvbHZlIHRoZSB3cmFwcGVkIFByb21pc2UuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGFzayBBIGZ1bmN0aW9uIHJlcHJlc2VudGluZyB0aGUgc3RhcnRpbmcgdGFzay5cbiAqIEByZXR1cm4ge1Byb21pc2V9ICAgICAgIEEgUHJvbWlzZSBvZiB0aGUgdmFsdWUgb2YgdGhlIHN0YXJ0aW5nIHRhc2suXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0V2l0aCh0YXNrKSB7XG4gIHJldHVybiB3YWl0Rm9yKHRydWVGbiwgMCwgdGFzaykoKTtcbn1cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGEgY29uZGl0aW9uIG9uIGFuIGludGVydmFsLCBhbmQgb3B0aW9uYWxseSBydW5zIGFcbiAqIHRhc2sgYWZ0ZXJ3YXJkLiBJbnRlcm5hbGx5LCB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIGZ1bmN0aW9uIHJldHVybmluZyBhXG4gKiBQcm9taXNlIG9mIHRoZSBjb25kaXRpb24gYmVpbmcgdHJ1ZSwgYW5kIHRoZSBvcHRpb25hbCB0YXNrJ3MgcmV0dXJuIHZhbHVlIGlzXG4gKiBwYXNzZWQgaW50byB0aGUgUHJvbWlzZSdzIHJlc29sdmUgZnVuY3Rpb24gYWxsb3dpbmcgdGhlIHZhbHVlIHRvIGJlIHVzZWRcbiAqIGxhdGVyIGluIHRoZSBQcm9taXNlIGNoYWluLiBUaGUgc2VtYW50aWNzIG9mIHRoZSBmdW5jdGlvbiBtYWtlIGl0IHBhc3NhYmxlXG4gKiBpbnRvIHRoZSBgdGhlbmAgbWV0aG9kIG9mIGEgUHJvbWlzZSBvYmplY3QuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY29uZGl0aW9uICAgICAgICAgICAgVGhlIHRlc3QgY29uZGl0aW9uIGZ1bmN0aW9uIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5zIGEgYm9vbGVhblxuICogQHBhcmFtICB7TnVtYmVyfSBbY29uZGl0b25JbnRlcnZhbD0xMDBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXR3ZWVuIHRlc3RpbmcgdGhlIGNvbmRpdGlvblxuICogQHBhcmFtICB7RnVuY3Rpb259IFt0YXNrPW51bGxdICAgICAgICAgIEFuIG9wdGlvbmFsIHRhc2sgZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gdGhlIGNvbmRpdGlvbiBpcyB0cnVlLiBUaGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgb2YgdGhlIHRhc2sgaXMgcGFzc2VkIHRvXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGludGVybmFsIFByb21pc2UncyByZXNvbHZlLlxuICogQHJldHVybiB7RnVuY3Rpb259ICAgICAgICAgICAgICAgICAgICAgIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBjb25kaXRpb24gZnVuY3Rpb24gYmVpbmcgdHJ1ZS5cbiAqL1xuZnVuY3Rpb24gd2FpdEZvcihjb25kaXRpb24sIGNvbmRpdG9uSW50ZXJ2YWwgPSAxMDAsIHRhc2sgPSBudWxsKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgdHlwZW9mIGNvbmRpdG9uSW50ZXJ2YWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhc2sgPSBjb25kaXRvbkludGVydmFsOyBjb25kaXRvbkludGVydmFsID0gMTAwO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gdG9kbzogcmVmYWN0b3IgdGhpcyB0byBnZXQgcmlkIG9mIHRoZSBicmFuY2ggYmV0d2VlbiB0eXBlc1xuICAgICAgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc29sdmUodGFzayAmJiB0YXNrKCkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGNvbmRpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChjb25kaXRpb24oKSkge1xuICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodGFzayAmJiB0YXNrKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgY29uZGl0b25JbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogQSBzaW1wbGUgdGFzayBmdW5jdGlvbi4gVGhlIGZ1bmN0aW9uIGNhbGxzIGB3YWl0Rm9yYCBpbnRlcm5hbGx5LCBzbyBpdFxuICogc2ltcGx5IHJldHVybnMgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBQcm9taXNlLiBMaWtlIGBzdGFydFdpdGhgLCB0aGlzXG4gKiBmdW5jdGlvbiBzdXBwbGllcyBgKCkgPT4gdHJ1ZWAgYXMgdGhlIGNvbmRpdGlvbiBjYXVzaW5nIHRoZSBpbnRlcm5hbFxuICogUHJvbWlzZSB0byByZXNvbHZlIGltbWVkaWF0ZWx5LiBUaGUgaW50ZXJ2YWwgaXMgc3VwcGxpZWQgYXMgYDFgIHRvIG1ha2UgdGhlXG4gKiByZXNvbHV0aW9uIGhhcHBlbiBvbiB0aGUgbmV4dCB0aWNrIGFmdGVyIG9uZSBtaWxsaXNlY29uZC4gVGhlIHNlbWFudGljcyBvZlxuICogdGhlIGZ1bmN0aW9uIG1ha2UgaXQgcGFzc2FibGUgaW50byB0aGUgYHRoZW5gIG1ldGhvZCBvZiBhIFByb21pc2Ugb2JqZWN0LlxuICogQHBhcmFtICB7RnVuY3Rpb259ICB0YXNrIFRoZSB0YXNrIGZ1bmN0aW9uIHRvIHJ1bi4gRXhlY3V0ZXMgYWZ0ZXIgMW1zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgUmV0dXJucyBhIGZ1bmN0aW9uIHJldHVybmluZyBhIFByb21pc2UgdGhhdCByZXNvbHZlc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIDFtcy5cbiAqL1xuZnVuY3Rpb24gZG9UaGlzKHRhc2spIHtcbiAgcmV0dXJuIHdhaXRGb3IodHJ1ZUZuLCAxLCB0YXNrKTtcbn1cblxuZXhwb3J0IHsgc3RhcnRXaXRoLCB3YWl0Rm9yLCBkb1RoaXMgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0FzeW5jVGVzdEhlbHBlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=