'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = undefined;

var _kinveyJavascriptSdkCore = require('kinvey-javascript-sdk-core');

var _model = require('./model');

var _utils = require('./utils');

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Extend Backbone.Collection
var Collection = _backbone2.default.Collection.extend({
  dataStoreType: _kinveyJavascriptSdkCore.DataStoreType.Sync,
  query: undefined,
  model: _model.Model,

  initialize: function initialize(models) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // Call parent
    var result = _backbone2.default.Collection.prototype.initialize.apply(this, arguments);

    // Validate arguments
    if (options.query && !(options.query instanceof _kinveyJavascriptSdkCore.Query)) {
      throw new Error('options.query argument must be of type: Kinvey.Query.');
    }

    // Set the query
    this.query = options.query;

    // Return the parent’s response
    return result;
  },
  clear: function clear() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    // Override the success callback
    var success = options.success;
    options.success = function (response) {
      _this.reset([], options);
      if ((0, _isFunction2.default)(success)) success.call(options.context, _this, response, options);
      _this.trigger('sync', _this, response, options);
    };

    // Sync
    options = (0, _utils.defaultOptions)(this, options, false);
    return this.sync('clear', this, options);
  },
  pullFromKinvey: function pullFromKinvey(options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    return this.sync('pull', this, options);
  },
  pushToKinvey: function pushToKinvey(options) {
    options = (0, _utils.defaultOptions)(this, options, false);
    return this.sync('push', this, options);
  },
  syncWithKinvey: function syncWithKinvey(options) {
    var _this2 = this;

    return this.pushToKinvey(options).then(function () {
      return _this2.pullFromKinvey(options);
    });
  }
});

// Add Backbone extend
Collection.extend = _backbone2.default.Collection.extend;

// Export
exports.Collection = Collection;