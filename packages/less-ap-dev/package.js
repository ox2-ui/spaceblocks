Package.describe({
  summary: "LESS 1.5.1 + Autoprefixer 1.0.20131222 DEV - chrome 31"
});

Package._transitional_registerBuildPlugin({
  name: "compileLessApd",
  use: [],
  sources: [
    'plugin/compile-less.js'
  ],
  npmDependencies: {"less": "1.5.1", "autoprefixer": "1.0.20131222"},
});


Package.on_test(function (api) {
  api.use(['test-helpers', 'tinytest']);
  api.use(['spark']);
  api.add_files(['less_tests.less', 'less_tests.js'], 'client');
});
