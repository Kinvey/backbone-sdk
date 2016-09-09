(function(root, _, $, Backbone, Kinvey) {
  root.Book = Kinvey.Model.extend({
    idAttribute: '_id',
    urlRoot: '/Books'
  });
})(window, window._, window.$, window.Backbone, window.Kinvey);
