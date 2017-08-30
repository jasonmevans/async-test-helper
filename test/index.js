var sources = require.context('../src', true, /\.js$/);
sources.keys().forEach(sources);

var tests = require.context('../test', true, /\.test\.js$/);
tests.keys().forEach(tests);
