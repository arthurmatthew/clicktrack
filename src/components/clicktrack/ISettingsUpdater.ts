import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';

export interface ISettingsUpdater {
  settings: ClicktrackData;
  updateSettings: (update: Partial<ClicktrackData>) => void;
}
