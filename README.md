# async-test-helper

I decided to write this little package to help me out when I was writing some Jasmine tests for a bit of asyncronous code I was working on. I noticed that Jasmine had removed the old `runs` and `waitsFor` functions from the API, and I found myself writing the same Promise code over and over. The functions within this library attempt to achieve similar async syntactic sugar to make writing async test cases a bit easier, and less verbose. 

**Note:** There may be a better way to do this, so feel free to share insights into better implementations. I love learning new things.
