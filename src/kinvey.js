import PhoneGapKinvey from 'kinvey-phonegap-sdk';
import { Collection, Model, Files, User } from './models';
import Device from './device';
import assign from 'lodash/assign';

export class Kinvey extends PhoneGapKinvey {
  static init(options = {}) {
    options = assign({
      deviceClass: Device
    }, options);

    // Initialize Kinvey
    return super.init(options);
  }
}

// Add modules to Kinvey namespace
Kinvey.Collection = Collection;
Kinvey.Model = Model;
Kinvey.Files = Files;
Kinvey.User = User;

// Export
export default Kinvey;
