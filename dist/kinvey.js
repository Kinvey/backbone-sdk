'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Kinvey = undefined;

var _kinveyHtml5Sdk = require('kinvey-html5-sdk');

var _models = require('./models');

var _device = require('./device');

var _popup = require('./popup');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Kinvey = exports.Kinvey = function (_HTML5Kinvey) {
  _inherits(Kinvey, _HTML5Kinvey);

  function Kinvey() {
    _classCallCheck(this, Kinvey);

    return _possibleConstructorReturn(this, (Kinvey.__proto__ || Object.getPrototypeOf(Kinvey)).apply(this, arguments));
  }

  return Kinvey;
}(_kinveyHtml5Sdk.Kinvey);

// Add modules to Kinvey namespace


Kinvey.Device = _device.Device;
Kinvey.Popup = _popup.Popup;
Kinvey.Collection = _models.Collection;
Kinvey.Model = _models.Model;
Kinvey.Files = _models.Files;
Kinvey.User = _models.User;