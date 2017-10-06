import { startWith, waitFor, doThis, TimeoutError, ConditionError, TaskError } from 'Src/AsyncTestHelper';

describe('AsyncTestHelper', function() {

  describe('startWith', function() {
    it('should return a Promise of an immediately resolved "task"', function(done) {
      let taskDone = false,
          startTask = startWith(() => taskDone = true);

      expect(startTask instanceof Promise).toBe(true);
      startTask.then(isTaskDone => {
        expect(isTaskDone).toBeTruthy();
      })
      .then(done)
      .catch(fail);
    });
  });

  describe('waitFor', function() {
    it('should return a function which returns a Promise', function() {
      let waitTask = waitFor(() => true);
      expect(waitTask instanceof Function).toBeTruthy();

      var promise = waitTask();
      expect(promise instanceof Promise).toBeTruthy();
    });
    it('should wait for a specified time before executing its task', function(done) {
      let taskDone = false,
          waitTime = 1000,
          startTime = Date.now();

      waitFor(waitTime, () => {
        expect(taskDone).toBeTruthy();
        return Date.now();
      })()
      .then(completeTime => {
        expect(completeTime - startTime).toBeGreaterThanOrEqualTo(waitTime);
      })
      .then(done)
      .catch(fail);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should wait for a conditon to be met before executing its task', function(done) {
      let taskDone = false,
          waitTaskValue = 'wait done';

      waitFor(() => taskDone, () => {
        expect(taskDone).toBeTruthy();
        return waitTaskValue;
      })()
      .then(waitValue => {
        expect(waitValue).toEqual(waitTaskValue);
      })
      .then(done)
      .catch(fail);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should resolve with the return value of the task', function(done) {
      let taskDone = false,
          doneValue = 'task done';

      waitFor(() => taskDone, () => doneValue)()
      .then(taskValue => {
        expect(taskValue).toEqual(doneValue);
      })
      .then(done)
      .catch(fail);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should pass resolve values directly through to the next the task', function(done) {

      startWith(() => 1)
      .then(waitFor(100, v => v))
      .then(doThis(a => {
        expect(a).toEqual(1);
        return a + 1;
      }))
      .then(waitFor(100, v => v))
      .then(doThis(b => {
        expect(b).toEqual(2);
        return b + 1;
      }))
      .then(waitFor(100, v => v))
      .then(doThis(c => {
        expect(c).toEqual(3);
      }))
      .then(done)
      .catch(fail);

    });
    describe('Wait Timeout', () => {
      it('should reject with a timeout error when exceeding the async timeout threshold', function should(done) {
        let waitTime = 500,
            timeout = 250;

        startWith(() => 1)
        .then(waitFor(waitTime, 100, null, timeout))
        .then(fail.bind(jasmine, `Didn't wait long enough - wait: ${waitTime}, timeout: ${timeout}`))
        .catch(e => {
          expect(e instanceof TimeoutError).toBeTruthy();
        })
        .then(done);
      });
      it('should reject with a timeout error when exceeding the async timeout threshold', function should(done) {
        let taskDone = false,
            timeout = 250;

        startWith(() => 1)
        .then(waitFor(() => taskDone, 100, null, timeout))
        .then(fail.bind(jasmine, `Didn't wait long enough - ${timeout}`))
        .catch(e => {
          expect(e instanceof TimeoutError).toBeTruthy();
        })
        .then(done);

        window.setTimeout(() => {
          taskDone = true;
        }, 500);
      });
    });
    describe('Exception Handling', () => {
      it('should catch an exception in the condition function, and pass to reject()', function should(done) {
        var taskDone = false,
            error = 'this is an error';

        waitFor(() => {
          throw new Error(error);
        })()
        .then(fail)
        .catch(e => {
          expect(e instanceof ConditionError).toBeTruthy();
          expect(e.message).toBe(error);
        })
        .then(done);

        window.setTimeout(() => {
          taskDone = true;
        }, 250);
      });
      it('should catch an exception in the task function, and pass to reject()', function should(done) {
        var taskDone = false,
            error = 'this is an error';

        waitFor(() => taskDone, () => {
          throw new Error(error);
        })()
        .then(fail)
        .catch(e => {
          expect(e instanceof TaskError).toBeTruthy();
          expect(e.message).toBe(error);
        })
        .then(done);

        window.setTimeout(() => {
          taskDone = true;
        }, 250);
      });
    });
  });

  describe('doThis', function() {
    it('should return a function which returns a Promise', function() {
      var doTask = doThis(() => true);
      expect(doTask instanceof Function).toBeTruthy();

      var promise = doTask();
      expect(promise instanceof Promise).toBeTruthy();
    });
    it('should immediately execute its task', function(done) {
      var taskDone = false;
      var doTask = doThis(() => taskDone = true)();

      expect(doTask instanceof Promise).toBeTruthy();
      doTask.then(isTaskDone => {
        expect(isTaskDone).toBeTruthy();
      })
      .then(done)
      .catch(fail);
    });
  });

});
