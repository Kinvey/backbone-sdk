'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _models = require('./models');

var _backbone = require('backbone');

var _backbone2 = _interopRequireDefault(_backbone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Override Backbone.sync
_backbone2.default.sync = _models.sync;

// Export
module.exports = _index2.default;