/**
 * [startWith description]
 * @param  {[type]} task [description]
 * @return {[type]}      [description]
 */
function startWith(task) {
  return waitFor(() => true, 0, task)();
}

/**
 * [waitFor description]
 * @param  {[type]} condition              [description]
 * @param  {Number} [conditonInterval=100] [description]
 * @param  {[type]} [task=null]            [description]
 * @return {[type]}                        [description]
 */
function waitFor(condition, conditonInterval = 100, task = null) {
  if (arguments.length == 2 && typeof time == 'function') {
    fn = time; time = 100;
  }
  return function() {
    return new Promise((resolve, reject) => {
      var interval = window.setInterval(() => {
        try {
          if (condition()) {
            window.clearInterval(interval);
            resolve(task && task());
          }
        }
        catch (e) {
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
  return waitFor(() => true, 1, task);
}

export { startWith, waitFor, doThis };
