import { startWith, waitFor, doThis } from 'Src/AsyncTestHelper';

describe('AsyncTestHelper', function() {

  describe('startWith', function() {
    it('should return a Promise of an immediately resolved "task"', function(done) {
      var taskDone = false;
      var startTask = startWith(() => taskDone = true);
      expect(startTask instanceof Promise).toBe(true);
      startTask.then(() => {
        expect(taskDone).toBeTruthy();
      })
      .then(done)
      .catch(done);
    });
  });

  describe('waitFor', function() {
    it('should return a function which returns a Promise', function() {
      var waitTask = waitFor(() => true);
      expect(waitTask instanceof Function).toBeTruthy();

      var promise = waitTask();
      expect(promise instanceof Promise).toBeTruthy();
    });
    it('should wait for a specified time before executing its task', function(done) {
      var taskDone = false,
          waitTime = 1000,
          startTime = Date.now();

      waitFor(waitTime, () => {
        expect(taskDone).toBeTruthy();
        return Date.now();
      })()
      .then((completeTime) => {
        expect(completeTime - startTime).toBeGreaterThanOrEqualTo(waitTime);
      })
      .then(done)
      .catch(done);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should wait for a conditon to be met before executing its task', function(done) {
      var taskDone = false,
          waitTaskResult = 'passed value';

      waitFor(() => taskDone, () => {
        expect(taskDone).toBeTruthy();
        return waitTaskResult;
      })()
      .then((value) => {
        expect(value).toEqual(waitTaskResult);
      })
      .then(done)
      .catch(done);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should resolve with the return value of the task', function(done) {
      var taskDone = false,
          doneValue = 'task done';

      waitFor(() => taskDone, () => doneValue)()
      .then((taskValue) => {
        expect(taskValue).toEqual(doneValue);
      })
      .then(done)
      .catch(done);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should pass resolve values directly through to the next the task', function(done) {

      startWith(() => 1)
      .then(waitFor(100, v => v))
      .then(doThis(a => {
        expect(a).toEqual(1);
        return 2;
      }))
      .then(waitFor(100, v => v))
      .then(doThis(b => {
        expect(b).toEqual(2);
        return 3;
      }))
      .then(waitFor(100, v => v))
      .then(doThis(c => {
        expect(c).toEqual(3);
      }))
      .then(done)
      .catch(done);

    });
    describe('Exception Handling', () => {
      it('should catch an exception in the condition function, and pass to reject()', function should(done) {
        var taskDone = false,
            error = 'this is an error';

        waitFor(() => {
          throw new Error(error);
        })()
        .catch((e) => {
          expect(e instanceof Error).toBeTruthy();
          expect(e.message).toBe(error);
          done();
        });

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
        .catch((e) => {
          expect(e instanceof Error).toBeTruthy();
          expect(e.message).toBe(error);
          done();
        });

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
      doTask.then(() => {
        expect(taskDone).toBeTruthy();
      })
      .then(done)
      .catch(done);
    });
  });

});
