import { ClicktrackData } from '../../models/clicktrack/ClicktrackData';

export const sectionEmpty = (sections: ClicktrackData['sections']) => {
  if (sections.length !== 0) return false;

  console.error(
    'You must have a section in your clicktrack. How did you even get in this position?'
  );
  return true;
};
