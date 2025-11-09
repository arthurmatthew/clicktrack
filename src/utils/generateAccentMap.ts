export const generateAccentMap = (
  beatsPerBar: number,
  beatValue: number,
  subdivisionDenominator: number = 16
) => {
  const subdivisionsPerBeat = subdivisionDenominator / beatValue;
  const totalSubdivisons = beatsPerBar * subdivisionsPerBeat;

  return Array.from({ length: totalSubdivisons }, (_, i) => {
    if (i === 0) return 3;
    return i % subdivisionsPerBeat === 0 ? 2 : 0;
  });
};
