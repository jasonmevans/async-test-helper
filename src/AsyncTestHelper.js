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
function waitFor(condition, conditonInterval = 100, task = null, timeout = 10000) {
  if (arguments.length == 2 && typeof conditonInterval == 'function') {
    task = conditonInterval;
    conditonInterval = 100;
  }

  return function() {
    let context = this, args = arguments;
    return Promise.race([

      // todo: document timeout behavior
      new Promise((resolve, reject) => {
        window.setTimeout(function() {
          reject(new TimeoutError(timeout));
        }, timeout);
      }),

      new Promise((resolve, reject) => {
        // todo: refactor this to get rid of the branch between types
        if (typeof condition === 'number') {
          const timeout = window.setTimeout(() => {
            try {
              // todo: update documentation for passing args among tasks
              resolve(task && task.apply(context, args));
            }
            catch (e) {
              reject(new TaskError(e.message));
            }
          }, condition);
        }
        else {
          const interval = window.setInterval(() => {
            let conditionSatisfied = false;
            try {
              conditionSatisfied = condition();
            }
            catch (e) {
              window.clearInterval(interval);
              reject(new ConditionError(e.message));
            }
            try {
              if (conditionSatisfied) {
                window.clearInterval(interval);
                resolve(task && task.apply(context, args));
              }
            }
            catch (e) {
              window.clearInterval(interval);
              reject(new TaskError(e.message));
            }
          }, conditonInterval);
        }
      })

    ]);
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

class AsyncError extends Error {
  constructor(...args) {
    super(...args);

    if (Error.prototype.hasOwnProperty('captureStackTrace'))
      Error.captureStackTrace(this, TimeoutError);
  }
}
class TimeoutError extends AsyncError {
  constructor(timeout) {
    super(`Exceeded async wait timeout: ${timeout}`);
  }
}
class ConditionError extends AsyncError {}
class TaskError extends AsyncError {}

export { startWith, waitFor, doThis, TimeoutError, ConditionError, TaskError };
