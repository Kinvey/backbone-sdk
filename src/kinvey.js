import { Kinvey as HTML5Kinvey } from 'kinvey-html5-sdk';
import { Collection, Model, Files, User } from './models';
import { Device } from './device';
import { Popup } from './popup';

export class Kinvey extends HTML5Kinvey {}

// Add modules to Kinvey namespace
Kinvey.Device = Device;
Kinvey.Popup = Popup;
Kinvey.Collection = Collection;
Kinvey.Model = Model;
Kinvey.Files = Files;
Kinvey.User = User;
