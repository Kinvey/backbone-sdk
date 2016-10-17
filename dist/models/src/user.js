'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _entity = require('kinvey-node-sdk/dist/entity');

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _utils = require('./utils');

var _result = require('lodash/result');

var _result2 = _interopRequireDefault(_result);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kmdAttribute = process.env.KINVEY_KMD_ATTRIBUTE || '_kmd';

var User = _model2.default.extend({
  set: function set(key, val, options) {
    if (key === null || key === undefined) {
      return this;
    }

    // Handle both `"key", value` and `{key: value}` -style arguments.
    var attrs = void 0;
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    // Handle Kinvey.Metadata
    if ((0, _has2.default)(attrs, 'metadata') || (0, _has2.default)(attrs, kmdAttribute)) {
      var metadata = attrs.metadata || attrs[kmdAttribute];
      metadata = (0, _result2.default)(metadata, 'toPlainObject', metadata);
      attrs[kmdAttribute] = metadata;
    }

    // Call super
    return _model2.default.prototype.set.apply(this, [attrs, options]);
  },
  isActive: function isActive() {
    var kinveyUser = new _entity.User(this.attributes);
    return kinveyUser.isActive();
  },
  isEmailVerified: function isEmailVerified() {
    var kinveyUser = new _entity.User(this.attributes);
    return kinveyUser.isEmailVerified();
  },
  login: function login(username, password, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.login(username, password, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  loginWithMIC: function loginWithMIC(redirectUri, authorizationGrant, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.loginWithMIC(redirectUri, authorizationGrant, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  connectIdentity: function connectIdentity(identity, session, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.connectIdentity(identity, session, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  connectFacebook: function connectFacebook(clientId, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.connectFacebook(clientId, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  disconnectFacebook: function disconnectFacebook(options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(kinveyUser.disconnectFacebook(options), options);
  },
  connectGoogle: function connectGoogle(clientId, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.connectGoogle(clientId, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  disconnectGoogle: function disconnectGoogle(options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(kinveyUser.disconnectFacebook(options), options);
  },
  connectLinkedIn: function connectLinkedIn(clientId, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.connectLinkedIn(clientId, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  disconnectLinkedIn: function disconnectLinkedIn(options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(kinveyUser.disconnectLinkedIn(options), options);
  },
  disconnectIdentity: function disconnectIdentity(identity, options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(kinveyUser.disconnectIdentity(options), options);
  },
  logout: function logout(options) {
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(_entity.User.logout(options), options);
  },
  signup: function signup(data, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.signup(data, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  signupWithIdentity: function signupWithIdentity(identity, session, options) {
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = _entity.User.signupWithIdentity(identity, session, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  update: function update(data, options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = kinveyUser.update(data, options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  me: function me(options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, true);
    var promise = kinveyUser.me(options).then(function (user) {
      return user.data;
    });
    return (0, _utils.wrapCallbacks)(promise, options);
  },
  verifyEmail: function verifyEmail(options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(kinveyUser.verifyEmail(options), options);
  },
  forgotUsername: function forgotUsername(options) {
    var kinveyUser = new _entity.User(this.attributes, options);
    options = (0, _utils.defaultOptions)(this, options, false);
    return (0, _utils.wrapCallbacks)(kinveyUser.forgotUsername(options), options);
  }
}, {
  getActiveUser: function getActiveUser(client) {
    var activeUser = _entity.User.getActiveUser(client);

    if (activeUser) {
      return new User(activeUser.data);
    }

    return null;
  },
  resetPassword: function resetPassword(username, options) {
    return (0, _utils.wrapCallbacks)(_entity.User.resetPassword(username, options), options);
  },
  exists: function exists(username, options) {
    return (0, _utils.wrapCallbacks)(_entity.User.exists(username, options), options);
  },
  restore: function restore(id, options) {
    return (0, _utils.wrapCallbacks)(_entity.User.restore(id, options), options);
  }
});

// Export
exports.default = User;