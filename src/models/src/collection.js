import { Query, DataStoreType } from 'kinvey-js-sdk/dist/export';
import Backbone from 'backbone';
import isFunction from 'lodash/isFunction';
import Model from './model';
import { defaultOptions } from './utils';

// Extend Backbone.Collection
const Collection = Backbone.Collection.extend({
  dataStoreType: DataStoreType.Cache,
  query: undefined,
  model: Model,

  initialize(models, options = {}) {
    // Call parent
    const result = Backbone.Collection.prototype.initialize.apply(this, [models, options]);

    // Validate arguments
    if (options.query && !(options.query instanceof Query)) {
      throw new Error('options.query argument must be of type: Kinvey.Query.');
    }

    // Set the query
    this.query = options.query;

    // Return the parent’s response
    return result;
  },

  clear(options = {}) {
    // Override the success callback
    const success = options.success;
    options.success = (response) => {
      this.reset([], options);
      if (isFunction(success)) success.call(options.context, this, response, options);
      this.trigger('sync', this, response, options);
    };

    // Sync
    options = defaultOptions(this, options, false);
    return this.sync('clear', this, options);
  },

  pullFromKinvey(options) {
    options = defaultOptions(this, options, true);
    return this.sync('pull', this, options);
  },

  pushToKinvey(options) {
    options = defaultOptions(this, options, false);
    return this.sync('push', this, options);
  },

  syncWithKinvey(options) {
    return this.pushToKinvey(options).then(() => this.pullFromKinvey(options));
  }
});

// Add Backbone extend
Collection.extend = Backbone.Collection.extend;

// Export
export default Collection;
