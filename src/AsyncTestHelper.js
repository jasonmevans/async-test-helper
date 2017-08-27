function startWith(fn) {
  return waitFor(() => true, 0, fn)();
}

function waitFor(condition, conditonInterval = 100, fn = null) {
  if (arguments.length == 2 && typeof time == 'function') {
    fn = time; time = 100;
  }

  return function() {
    return new Promise((resolve, reject) => {
      var interval = window.setInterval(() => {
        try {
          if (condition()) {
            window.clearInterval(interval);
            resolve(fn && fn());
          }
        }
        catch (e) {
          reject(e);
        }
      }, conditonInterval);
    });
  };
}

function doThis(fn) {
  return function() {
    return waitFor(() => true, 1, fn);
  };
}

export { startWith, waitFor, doThis };
