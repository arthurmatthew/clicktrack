import { ClicktrackData } from '../../models/ClicktrackData';

export const sectionOnlyOne = (sections: ClicktrackData['sections']) => {
  if (sections.length !== 1) return false;

  console.error('You must have at least one section.');
  return true;
};
