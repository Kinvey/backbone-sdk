import { DataStore } from 'kinvey-node-sdk/dist/datastore';
import { Promise } from 'es6-promise';
import { wrapCallbacks } from './utils';
import result from 'lodash/result';
import isFunction from 'lodash/isFunction';

export default function sync(method, model, options) {
  const query = model.query;
  let url = result(model, 'url');
  const data = model.toJSON(options);

  if (!url) {
    return Promise.reject(new Error('Model must contain a url.'));
  }

  // Strip the leading slash
  if (url.indexOf('/') === 0) {
    url = url.substr(1);
  }

  // Extract the collection and entity id from the url
  const segments = url.split('/');
  const collection = segments[0];
  const id = segments[1] || data._id || undefined;
  const namespace = DataStore.collection(collection, model.dataStoreType);

  // Translate Backbone methods to Kinvey methods
  const methodMap = {
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
  let args = [undefined, options];
  if (query) {
    args = [query, options];
  } else if (method === 'read' || method === 'delete') {
    args = [id, options];
  } else if (method === 'create' || method === 'update') {
    args = [data, options];
  }

  // Get the fn
  const fn = methodMap[method];

  // Invoke Kinvey Fundtion
  if (isFunction(fn)) {
    if (method === 'read') {
      const stream = methodMap[method].apply(namespace, args);
      wrapCallbacks(stream.toPromise(), options);
      return stream;
    }

    return wrapCallbacks(methodMap[method].apply(namespace, args), options);
  }

  return Promise.reject(new Error(`${method} is not available on Backbone.sync.`));
}
