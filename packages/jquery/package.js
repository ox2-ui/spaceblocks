Package.describe({
  summary: "jQuery v2.0.3 Manipulate the DOM using CSS selectors"
});

Package.on_use(function (api) {
  api.add_files(['jquery.js', 'post.js'], 'client');

  api.export('$', 'client');
  api.export('jQuery', 'client');
});
