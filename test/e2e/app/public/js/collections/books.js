(function(root, _, $, Backbone, Kinvey) {
  root.Books = Kinvey.Collection.extend({
    url: '/Books',
    model: root.Book,
    dataStoreType: Kinvey.DataStoreType.Sync,
    comparator: 'title'
  });
})(window, window._, window.$, window.Backbone, window.Kinvey);
