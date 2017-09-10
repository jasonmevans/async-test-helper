# async-test-helper

I decided to write this little package to help me out when I was writing some Jasmine tests for a bit of asynchronous code I was working on. I noticed that Jasmine had removed the old `runs` and `waitsFor` functions from the API, and I found myself writing the same Promise code over and over. The functions within this library attempt to achieve similar async syntactic sugar to make writing async test cases a bit easier, and less verbose.

**Note:** There may be a better way to do this, so feel free to share insights into better implementations. Sharing new ideas is what it's all about!

## Getting Started
### Install the package
```
npm install --save-dev async-test-helper
```

## Usage

To get started, you can use `startWith` to provide an initial task:
```javascript
startWith(() => {
  // some initial code to start things with
})
.then(...);
```

This function isn't actually required. You could alternately begin with the `waitFor` function, but the syntax would be a little weird because of the function `waitFor` returns (`startWith` lubricates the flow a tad):
```javascript
waitFor(() => {
  return n == 4; // your condition to wait for
})()
.then(...)
```

Notice the extra `()` after the call to `waitFor`. The `startWith` function simply lets you write tests that read more like English. By starting with `startWith` you can just throw a `waitFor` into the chained `then` (no need for extra parens because `then` expects to receive a function):
```javascript
startWith(() => {
  ...
})
.then(waitFor(() => {
  return n == 4;
}));
```

So what happens next? That's where `doThis` comes into play:
```javascript
var n = 0;
startWith(() => {
  window.setInterval(() => { n++; }, 250);
})
.then(waitFor(() => {
  return n == 4;
}))
.then(doThis(() => {
  expect(n).toBe(4);
}));
```

The nice thing about the `waitFor` function being built upon a Promise is that you can create more complex sequences by simply chaining more calls to `then`:
```javascript
var n = 0;
startWith(() => {
  window.setInterval(() => { n++; }, 250);
})
.then(waitFor(() => {
  return n == 4;
}))
.then(doThis(() => {
  expect(n).toBe(4);
  window.setInterval(() => { n++; }, 250);
}))
.then(waitFor(() => {
  return n == 8;
}))
.then(doThis(() => {
  expect(n).toBe(8);
}));
```
