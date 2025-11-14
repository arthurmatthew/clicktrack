import { ClicktrackData } from '../../models/ClicktrackData';
import { TNotify } from '../../types';

export const sectionIncorrectTransition = (
  sections: ClicktrackData['sections'],
  notify: TNotify,
) => {
  let result = true;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    if (section && section.type === 'transition') {
      const prevSection = i > 0 ? sections[i - 1] : null;
      const nextSection = i < sections.length - 1 ? sections[i + 1] : null;

      // Transition at the start (no previous section)
      if (!prevSection) {
        result = false;
        break;
      }

      // Transition at the end (no next section)
      if (!nextSection) {
        result = false;
        break;
      }

      // Previous section is not a metronome
      if (prevSection.type !== 'metronome') {
        result = false;
        break;
      }

      // Next section is not a metronome
      if (nextSection.type !== 'metronome') {
        result = false;
        break;
      }
    }
  }

  if (result === false)
    notify('You have incorrectly placed transitions.', 'error');
  return result;
};
