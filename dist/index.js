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
function startWith(fn) {
  return waitFor(function () {
    return true;
  }, 0, fn)();
}

function waitFor(condition) {
  var conditonInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (arguments.length == 2 && typeof time == 'function') {
    fn = time;time = 100;
  }

  return function () {
    return new Promise(function (resolve, reject) {
      var interval = window.setInterval(function () {
        try {
          if (condition()) {
            window.clearInterval(interval);
            resolve(fn && fn());
          }
        } catch (e) {
          reject(e);
        }
      }, conditonInterval);
    });
  };
}

function doThis(fn) {
  return function () {
    return waitFor(function () {
      return true;
    }, 1, fn);
  };
}

exports.startWith = startWith;
exports.waitFor = waitFor;
exports.doThis = doThis;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjRlZDc0NGU1MjMyOGZhZDYyYmUiLCJ3ZWJwYWNrOi8vLy4vQXN5bmNUZXN0SGVscGVyLmpzIl0sIm5hbWVzIjpbInN0YXJ0V2l0aCIsImZuIiwid2FpdEZvciIsImNvbmRpdGlvbiIsImNvbmRpdG9uSW50ZXJ2YWwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ0aW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbnRlcnZhbCIsIndpbmRvdyIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImUiLCJkb1RoaXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQSxTQUFTQSxTQUFULENBQW1CQyxFQUFuQixFQUF1QjtBQUNyQixTQUFPQyxRQUFRO0FBQUEsV0FBTSxJQUFOO0FBQUEsR0FBUixFQUFvQixDQUFwQixFQUF1QkQsRUFBdkIsR0FBUDtBQUNEOztBQUVELFNBQVNDLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQStEO0FBQUEsTUFBbkNDLGdCQUFtQyx1RUFBaEIsR0FBZ0I7QUFBQSxNQUFYSCxFQUFXLHVFQUFOLElBQU07O0FBQzdELE1BQUlJLFVBQVVDLE1BQVYsSUFBb0IsQ0FBcEIsSUFBeUIsT0FBT0MsSUFBUCxJQUFlLFVBQTVDLEVBQXdEO0FBQ3RETixTQUFLTSxJQUFMLENBQVdBLE9BQU8sR0FBUDtBQUNaOztBQUVELFNBQU8sWUFBVztBQUNoQixXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsVUFBSUMsV0FBV0MsT0FBT0MsV0FBUCxDQUFtQixZQUFNO0FBQ3RDLFlBQUk7QUFDRixjQUFJVixXQUFKLEVBQWlCO0FBQ2ZTLG1CQUFPRSxhQUFQLENBQXFCSCxRQUFyQjtBQUNBRixvQkFBUVIsTUFBTUEsSUFBZDtBQUNEO0FBQ0YsU0FMRCxDQU1BLE9BQU9jLENBQVAsRUFBVTtBQUNSTCxpQkFBT0ssQ0FBUDtBQUNEO0FBQ0YsT0FWYyxFQVVaWCxnQkFWWSxDQUFmO0FBV0QsS0FaTSxDQUFQO0FBYUQsR0FkRDtBQWVEOztBQUVELFNBQVNZLE1BQVQsQ0FBZ0JmLEVBQWhCLEVBQW9CO0FBQ2xCLFNBQU8sWUFBVztBQUNoQixXQUFPQyxRQUFRO0FBQUEsYUFBTSxJQUFOO0FBQUEsS0FBUixFQUFvQixDQUFwQixFQUF1QkQsRUFBdkIsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7UUFFUUQsUyxHQUFBQSxTO1FBQVdFLE8sR0FBQUEsTztRQUFTYyxNLEdBQUFBLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNGVkNzQ0ZTUyMzI4ZmFkNjJiZSIsImZ1bmN0aW9uIHN0YXJ0V2l0aChmbikge1xuICByZXR1cm4gd2FpdEZvcigoKSA9PiB0cnVlLCAwLCBmbikoKTtcbn1cblxuZnVuY3Rpb24gd2FpdEZvcihjb25kaXRpb24sIGNvbmRpdG9uSW50ZXJ2YWwgPSAxMDAsIGZuID0gbnVsbCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyICYmIHR5cGVvZiB0aW1lID09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IHRpbWU7IHRpbWUgPSAxMDA7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGNvbmRpdGlvbigpKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICByZXNvbHZlKGZuICYmIGZuKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSwgY29uZGl0b25JbnRlcnZhbCk7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRvVGhpcyhmbikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdhaXRGb3IoKCkgPT4gdHJ1ZSwgMSwgZm4pO1xuICB9O1xufVxuXG5leHBvcnQgeyBzdGFydFdpdGgsIHdhaXRGb3IsIGRvVGhpcyB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQXN5bmNUZXN0SGVscGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==