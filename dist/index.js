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
/**
 * [startWith description]
 * @param  {[type]} task [description]
 * @return {[type]}      [description]
 */
function startWith(task) {
  return waitFor(function () {
    return true;
  }, 0, task)();
}

/**
 * [waitFor description]
 * @param  {[type]} condition              [description]
 * @param  {Number} [conditonInterval=100] [description]
 * @param  {[type]} [task=null]            [description]
 * @return {[type]}                        [description]
 */
function waitFor(condition) {
  var conditonInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var task = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (arguments.length == 2 && typeof time == 'function') {
    fn = time;time = 100;
  }
  return function () {
    return new Promise(function (resolve, reject) {
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
    });
  };
}

/**
 * [doThis description]
 * @param  {[type]}  task [description]
 * @return {Boolean}      [description]
 */
function doThis(task) {
  return waitFor(function () {
    return true;
  }, 1, task);
}

exports.startWith = startWith;
exports.waitFor = waitFor;
exports.doThis = doThis;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MGZkZDM1Njk5YTgzODU1YTMwZiIsIndlYnBhY2s6Ly8vLi9Bc3luY1Rlc3RIZWxwZXIuanMiXSwibmFtZXMiOlsic3RhcnRXaXRoIiwidGFzayIsIndhaXRGb3IiLCJjb25kaXRpb24iLCJjb25kaXRvbkludGVydmFsIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidGltZSIsImZuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbnRlcnZhbCIsIndpbmRvdyIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImUiLCJkb1RoaXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7O0FBS0EsU0FBU0EsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDdkIsU0FBT0MsUUFBUTtBQUFBLFdBQU0sSUFBTjtBQUFBLEdBQVIsRUFBb0IsQ0FBcEIsRUFBdUJELElBQXZCLEdBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFNBQVNDLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQWlFO0FBQUEsTUFBckNDLGdCQUFxQyx1RUFBbEIsR0FBa0I7QUFBQSxNQUFiSCxJQUFhLHVFQUFOLElBQU07O0FBQy9ELE1BQUlJLFVBQVVDLE1BQVYsSUFBb0IsQ0FBcEIsSUFBeUIsT0FBT0MsSUFBUCxJQUFlLFVBQTVDLEVBQXdEO0FBQ3REQyxTQUFLRCxJQUFMLENBQVdBLE9BQU8sR0FBUDtBQUNaO0FBQ0QsU0FBTyxZQUFXO0FBQ2hCLFdBQU8sSUFBSUUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxVQUFJQyxXQUFXQyxPQUFPQyxXQUFQLENBQW1CLFlBQU07QUFDdEMsWUFBSTtBQUNGLGNBQUlYLFdBQUosRUFBaUI7QUFDZlUsbUJBQU9FLGFBQVAsQ0FBcUJILFFBQXJCO0FBQ0FGLG9CQUFRVCxRQUFRQSxNQUFoQjtBQUNEO0FBQ0YsU0FMRCxDQU1BLE9BQU9lLENBQVAsRUFBVTtBQUNSTCxpQkFBT0ssQ0FBUDtBQUNEO0FBQ0YsT0FWYyxFQVVaWixnQkFWWSxDQUFmO0FBV0QsS0FaTSxDQUFQO0FBYUQsR0FkRDtBQWVEOztBQUVEOzs7OztBQUtBLFNBQVNhLE1BQVQsQ0FBZ0JoQixJQUFoQixFQUFzQjtBQUNwQixTQUFPQyxRQUFRO0FBQUEsV0FBTSxJQUFOO0FBQUEsR0FBUixFQUFvQixDQUFwQixFQUF1QkQsSUFBdkIsQ0FBUDtBQUNEOztRQUVRRCxTLEdBQUFBLFM7UUFBV0UsTyxHQUFBQSxPO1FBQVNlLE0sR0FBQUEsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYXN5bmMtdGVzdC1oZWxwZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYXN5bmMtdGVzdC1oZWxwZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXN5bmMtdGVzdC1oZWxwZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODBmZGQzNTY5OWE4Mzg1NWEzMGYiLCIvKipcbiAqIFtzdGFydFdpdGggZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHRhc2sgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gc3RhcnRXaXRoKHRhc2spIHtcbiAgcmV0dXJuIHdhaXRGb3IoKCkgPT4gdHJ1ZSwgMCwgdGFzaykoKTtcbn1cblxuLyoqXG4gKiBbd2FpdEZvciBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gY29uZGl0aW9uICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IFtjb25kaXRvbkludGVydmFsPTEwMF0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBbdGFzaz1udWxsXSAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIHdhaXRGb3IoY29uZGl0aW9uLCBjb25kaXRvbkludGVydmFsID0gMTAwLCB0YXNrID0gbnVsbCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyICYmIHR5cGVvZiB0aW1lID09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IHRpbWU7IHRpbWUgPSAxMDA7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB2YXIgaW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChjb25kaXRpb24oKSkge1xuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0YXNrICYmIHRhc2soKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9LCBjb25kaXRvbkludGVydmFsKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBbZG9UaGlzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSAgdGFzayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZG9UaGlzKHRhc2spIHtcbiAgcmV0dXJuIHdhaXRGb3IoKCkgPT4gdHJ1ZSwgMSwgdGFzayk7XG59XG5cbmV4cG9ydCB7IHN0YXJ0V2l0aCwgd2FpdEZvciwgZG9UaGlzIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9Bc3luY1Rlc3RIZWxwZXIuanMiXSwic291cmNlUm9vdCI6IiJ9