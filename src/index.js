import { Kinvey } from './kinvey';
import { sync } from './models';
import Backbone from 'backbone';

// Override Backbone.sync
Backbone.sync = sync;

// Export
module.exports = Kinvey;
