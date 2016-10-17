import Backbone from 'backbone';

const Model = Backbone.Model.extend({
  idAttribute: '_id'
});

// Add Backbone extend
Model.extend = Backbone.Model.extend;

// Export
export default Model;
