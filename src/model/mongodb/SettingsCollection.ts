import { Collection } from './index';

export interface ISettings {
  own: string;
  theme: string;
  autoSave: boolean
}

export class SettingsCollection extends Collection<ISettings> {
  constructor() {
    super();
    this.collection = 'settings';
  }
}