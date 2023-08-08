import { ClicktrackData } from '../../models/ClicktrackData';

export interface ISettingsUpdater {
  settings: ClicktrackData;
  updateSettings: (update: Partial<ClicktrackData>) => void;
}
