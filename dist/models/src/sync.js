'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = sync;

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _es6Promise = require('es6-promise');

var _utils = require('./utils');

var _result = require('lodash/result');

var _result2 = _interopRequireDefault(_result);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sync(method, model, options) {
  var query = model.query;
  var url = (0, _result2.default)(model, 'url');
  var data = model.toJSON(options);

  if (!url) {
    return _es6Promise.Promise.reject(new Error('Model must contain a url.'));
  }

  // Strip the leading slash
  if (url.indexOf('/') === 0) {
    url = url.substr(1);
  }

  // Extract the collection and entity id from the url
  var segments = url.split('/');
  var collection = segments[0];
  var id = segments[1] || data._id || undefined;
  var namespace = _kinveyJavascriptSdkCore.DataStore.collection(collection, model.dataStoreType);

  // Translate Backbone methods to Kinvey methods
  var methodMap = {
    read: id ? namespace.findById : namespace.find,
    create: namespace.create,
    update: namespace.update,
    delete: id ? namespace.removeById : namespace.remove,
    clear: namespace.clear,
    pull: namespace.pull,
    push: namespace.push,
    sync: namespace.sync
  };

  // Create args
  var args = [undefined, options];
  if (query) {
    args = [query, options];
  } else if (method === 'read' || method === 'delete') {
    args = [id, options];
  } else if (method === 'create' || method === 'update') {
    args = [data, options];
  }

  // Get the fn
  var fn = methodMap[method];

  // Invoke Kinvey Fundtion
  if ((0, _isFunction2.default)(fn)) {
    if (method === 'read') {
      var stream = methodMap[method].apply(namespace, args);
      (0, _utils.wrapCallbacks)(stream.toPromise(), options);
      return stream;
    }

    return (0, _utils.wrapCallbacks)(methodMap[method].apply(namespace, args), options);
  }

  return _es6Promise.Promise.reject(new Error(method + ' is not available on Backbone.sync.'));
}