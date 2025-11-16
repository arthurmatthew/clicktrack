export const getSubdivisionLabel = (
  index: number,
  beatsPerBar: number,
  beatValue: number,
): string => {
  const subdivisionsPerBeat = 16 / beatValue;
  const totalVisibleSubdivisions = beatsPerBar * subdivisionsPerBeat;

  if (index >= totalVisibleSubdivisions) return '';

  const beatNumber = Math.floor(index / subdivisionsPerBeat) + 1;
  const positionInBeat = index % subdivisionsPerBeat;

  if (positionInBeat === 0) return beatNumber.toString();

  if (beatValue === 8) {
    return ['', '+'][positionInBeat] || '';
  }

  if (beatValue === 4) {
    return ['', 'e', '&', 'a'][positionInBeat] || '';
  }

  if (beatValue === 2) {
    return ['', 'e', '&', 'a', '2', '2e', '2&', '2a'][positionInBeat] || '';
  }

  if (beatValue === 16) {
    return '';
  }
  return '';
};
