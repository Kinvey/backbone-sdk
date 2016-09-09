'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.wrapCallbacks = wrapCallbacks;
exports.defaultOptions = defaultOptions;

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

var _extend = require('lodash/extend');

var _extend2 = _interopRequireDefault(_extend);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use the fastest possible means to execute a task in a future turn of the
// event loop. Borrowed from [q](http://documentup.com/kriskowal/q/).
var nextTick = void 0;
if ((0, _isFunction2.default)(global.setImmediate)) {
  // IE10, Node.js 0.9+.
  nextTick = root.setImmediate;
} else if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) !== undefined && process.nextTick) {
  // Node.js <0.9.
  nextTick = process.nextTick;
} else {
  // Most browsers.
  nextTick = function nextTick(fn) {
    global.setTimeout(fn, 0);
  };
}

// Wraps asynchronous callbacks so they get called when a promise fulfills or
// rejects. The `success` and `error` properties are extracted from `options`
// at run-time, allowing intermediate process to alter the callbacks.
function wrapCallbacks(promise) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  promise.then(function (value) {
    if (options.success) {
      // Invoke the success handler.
      options.success(value);
    }
  }).catch(function (reason) {
    if (options.error) {
      // Invoke the error handler.
      options.error(reason);
    }
  }).then(null, function (err) {
    // If an exception occurs, the promise would normally catch it. Since we
    // are using asynchronous callbacks, exceptions should be thrown all the
    // way.
    nextTick(function () {
      throw err;
    });
  });
  return promise;
}

// Helper function to wrap the optional callbacks with a default success and
// error callback.
function defaultOptions(model) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var mutate = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  options = (0, _extend2.default)({ parse: true }, options);

  // Extend the success callback.
  var success = options.success;
  options.success = function (response) {
    // If `mutate`, update the model.
    if (mutate === true) {
      if (model instanceof _backbone2.default.Model) {
        if (options.parse === true) {
          response = model.parse(response, options);
        }

        if (!model.set(response, options)) {
          return false;
        }
      } else {
        // Update the collection.
        var fn = options.reset ? 'reset' : 'set';

        if (!(0, _isFunction2.default)(model[fn])) {
          // Backbone < 1.0.0 does not have the set method.
          // If 0.9.9 & 0.9.10, use update. Otherwise, use reset.
          fn = (0, _isFunction2.default)(model.update) ? 'update' : 'reset';
        }

        model[fn](response, options);
      }
    }

    // Invoke the application-level success handler.
    if ((0, _isFunction2.default)(success)) {
      success.call(options.context, model, response, options);
    }

    // Trigger the `sync` event.
    if (mutate === true) {
      model.trigger('sync', model, response, options);
    }
  };

  // Extend the error callback.
  var error = options.error;
  options.error = function (response) {
    // Invoke the application-level error handler.
    if ((0, _isFunction2.default)(error)) {
      error.call(options.context, model, response, options);
    }

    // Trigger the `error` event.
    if (mutate === true) {
      model.trigger('error', model, response, options);
    }
  };

  return options;
}