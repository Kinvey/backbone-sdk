import { Device as HTML5Device } from 'kinvey-html5-sdk';
import packageJSON from '../package.json';
import assign from 'lodash/assign';

export class Device extends HTML5Device {
  static toJSON() {
    let json = super.toJSON();

    // Overwrite properties
    json = assign({}, json, {
      platform: {
        name: 'backbone'
      },
      kinveySDK: {
        name: packageJSON.name,
        version: packageJSON.version
      }
    });

    // Return
    return json;
  }
}
