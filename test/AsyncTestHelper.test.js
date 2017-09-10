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
    it('should wait for a conditon to be met before executing its task', function(done) {
      var taskDone = false;

      waitFor(() => taskDone, () => {
        expect(taskDone).toBeTruthy();
      })()
      .then(done)
      .catch(done);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
    it('should resolve with the return value of the task', function(done) {
      var taskDone = false;

      waitFor(() => taskDone, () => 'task done')()
      .then((taskValue) => {
        expect(taskValue == 'task done').toBeTruthy();
      })
      .then(done)
      .catch(done);

      window.setTimeout(() => {
        taskDone = true;
      }, 250);
    });
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
