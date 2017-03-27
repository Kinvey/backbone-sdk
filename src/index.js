import { NetworkRack } from 'kinvey-js-sdk';
import Kinvey from 'kinvey-phonegap-sdk';
import Backbone from 'backbone';
import { HttpMiddleware } from './middleware';
import { Collection, Model, Files, User, sync } from './models';

// Override Backbone.sync
Backbone.sync = sync;

// Setup racks
NetworkRack.useHttpMiddleware(new HttpMiddleware());

// Add modules to Kinvey namespace
Kinvey.Backbone = {
  Collection: Collection,
  Model: Model,
  Files: Files,
  User: User
};

// Export
module.exports = Kinvey;
