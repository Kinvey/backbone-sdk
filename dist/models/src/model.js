'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = undefined;

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _backbone2.default.Model.extend({
  idAttribute: '_id'
});

// Add Backbone extend
Model.extend = _backbone2.default.Model.extend;

// Export
exports.Model = Model;