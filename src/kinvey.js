import Kinvey from 'kinvey-phonegap-sdk';
import Backbone from 'backbone';
import { Collection, Model, Files, User, sync } from './models';

// Override Backbone.sync
Backbone.sync = sync;

// Add modules to Kinvey namespace
Kinvey.Backbone = {
  Collection: Collection,
  Model: Model,
  Files: Files,
  User: User
};

// Export
export default Kinvey;
