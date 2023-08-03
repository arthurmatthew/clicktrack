const convertTempoToTempoIndicator = (bpm: number) => {
  if (bpm > 178) {
    return 'Prestissimo';
  } else if (bpm > 168) {
    return 'Presto';
  } else if (bpm > 132) {
    return 'Vivace';
  } else if (bpm > 109) {
    return 'Allegro';
  } else if (bpm > 98) {
    return 'Allegretto';
  } else if (bpm > 86) {
    return 'Moderato';
  } else if (bpm > 73) {
    return 'Andante';
  } else if (bpm > 65) {
    return 'Adagietto';
  } else if (bpm > 55) {
    return 'Adagio';
  } else if (bpm > 45) {
    return 'Largo';
  } else if (bpm > 40) {
    return 'Lento';
  } else if (bpm > 20) {
    return 'Grave';
  } else {
    return 'Grave';
  }
};
