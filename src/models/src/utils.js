import Backbone from 'backbone';
import extend from 'lodash/extend';
import isFunction from 'lodash/isFunction';

// Use the fastest possible means to execute a task in a future turn of the
// event loop. Borrowed from [q](http://documentup.com/kriskowal/q/).
let nextTick;
if (isFunction(global.setImmediate)) { // IE10, Node.js 0.9+.
  nextTick = global.setImmediate;
} else if (typeof process !== 'undefined' && process.nextTick) { // Node.js <0.9.
  nextTick = process.nextTick;
} else { // Most browsers.
  nextTick = function(fn) {
    global.setTimeout(fn, 0);
  };
}

// Wraps asynchronous callbacks so they get called when a promise fulfills or
// rejects. The `success` and `error` properties are extracted from `options`
// at run-time, allowing intermediate process to alter the callbacks.
export function wrapCallbacks(promise, options = {}) {
  promise.then((value) => {
    if (options.success) { // Invoke the success handler.
      options.success(value);
    }
  }).catch((reason) => {
    if (options.error) { // Invoke the error handler.
      options.error(reason);
    }
  }).then(null, (err) => {
    // If an exception occurs, the promise would normally catch it. Since we
    // are using asynchronous callbacks, exceptions should be thrown all the
    // way.
    nextTick(() => {
      throw err;
    });
  });
  return promise;
}

// Helper function to wrap the optional callbacks with a default success and
// error callback.
export function defaultOptions(model, options = {}, mutate = true) {
  options = extend({ parse: true }, options);

  // Extend the success callback.
  const success = options.success;
  options.success = function(response) {
    // If `mutate`, update the model.
    if (mutate === true) {
      if (model instanceof Backbone.Model) {
        if (options.parse === true) {
          response = model.parse(response, options);
        }

        if (!model.set(response, options)) {
          return false;
        }
      } else { // Update the collection.
        let fn = options.reset ? 'reset' : 'set';

        if (!isFunction(model[fn])) { // Backbone < 1.0.0 does not have the set method.
          // If 0.9.9 & 0.9.10, use update. Otherwise, use reset.
          fn = isFunction(model.update) ? 'update' : 'reset';
        }

        model[fn](response, options);
      }
    }

    // Invoke the application-level success handler.
    if (isFunction(success)) {
      success.call(options.context, model, response, options);
    }

    // Trigger the `sync` event.
    if (mutate === true) {
      model.trigger('sync', model, response, options);
    }
  };

  // Extend the error callback.
  const error = options.error;
  options.error = function(response) {
    // Invoke the application-level error handler.
    if (isFunction(error)) {
      error.call(options.context, model, response, options);
    }

    // Trigger the `error` event.
    if (mutate === true) {
      model.trigger('error', model, response, options);
    }
  };

  return options;
}
