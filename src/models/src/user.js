import { User as KinveyUser } from 'kinvey-node-sdk/dist/entity';
import Model from './model';
import { defaultOptions, wrapCallbacks } from './utils';
import result from 'lodash/result';
import has from 'lodash/has';
const kmdAttribute = process.env.KINVEY_KMD_ATTRIBUTE || '_kmd';

const User = Model.extend({
  set(key, val, options) {
    if (key === null || key === undefined) {
      return this;
    }

    // Handle both `"key", value` and `{key: value}` -style arguments.
    let attrs;
    if (typeof key === 'object') {
      attrs = key;
      options = val;
    } else {
      (attrs = {})[key] = val;
    }

    // Handle Kinvey.Metadata
    if (has(attrs, 'metadata') || has(attrs, kmdAttribute)) {
      let metadata = attrs.metadata || attrs[kmdAttribute];
      metadata = result(metadata, 'toPlainObject', metadata);
      attrs[kmdAttribute] = metadata;
    }

    // Call super
    return Model.prototype.set.apply(this, [attrs, options]);
  },

  isActive() {
    const kinveyUser = new KinveyUser(this.attributes);
    return kinveyUser.isActive();
  },

  isEmailVerified() {
    const kinveyUser = new KinveyUser(this.attributes);
    return kinveyUser.isEmailVerified();
  },

  login(username, password, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.login(username, password, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  loginWithMIC(redirectUri, authorizationGrant, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.loginWithMIC(redirectUri, authorizationGrant, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  connectIdentity(identity, session, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.connectIdentity(identity, session, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  connectFacebook(clientId, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.connectFacebook(clientId, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  disconnectFacebook(options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, false);
    return wrapCallbacks(kinveyUser.disconnectFacebook(options), options);
  },

  connectGoogle(clientId, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.connectGoogle(clientId, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  disconnectGoogle(options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, false);
    return wrapCallbacks(kinveyUser.disconnectFacebook(options), options);
  },

  connectLinkedIn(clientId, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.connectLinkedIn(clientId, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  disconnectLinkedIn(options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, false);
    return wrapCallbacks(kinveyUser.disconnectLinkedIn(options), options);
  },

  disconnectIdentity(identity, options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, false);
    return wrapCallbacks(kinveyUser.disconnectIdentity(options), options);
  },

  logout(options) {
    options = defaultOptions(this, options, false);
    return wrapCallbacks(KinveyUser.logout(options), options);
  },

  signup(data, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.signup(data, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  signupWithIdentity(identity, session, options) {
    options = defaultOptions(this, options, true);
    const promise = KinveyUser.signupWithIdentity(identity, session, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  update(data, options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, true);
    const promise = kinveyUser.update(data, options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  me(options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, true);
    const promise = kinveyUser.me(options).then(user => user.data);
    return wrapCallbacks(promise, options);
  },

  verifyEmail(options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, false);
    return wrapCallbacks(kinveyUser.verifyEmail(options), options);
  },

  forgotUsername(options) {
    const kinveyUser = new KinveyUser(this.attributes, options);
    options = defaultOptions(this, options, false);
    return wrapCallbacks(kinveyUser.forgotUsername(options), options);
  }
}, {
  getActiveUser(client) {
    const activeUser = KinveyUser.getActiveUser(client);

    if (activeUser) {
      return new User(activeUser.data);
    }

    return null;
  },

  resetPassword(username, options) {
    return wrapCallbacks(KinveyUser.resetPassword(username, options), options);
  },

  exists(username, options) {
    return wrapCallbacks(KinveyUser.exists(username, options), options);
  },

  restore(id, options) {
    return wrapCallbacks(KinveyUser.restore(id, options), options);
  }
});

// Export
export default User;
