import { Section } from '../pages/app/metronomes';

export default function makeUnique(
  name: string,
  newName: string,
  prev: Section[]
) {
  let trials = 0;
  let uniqueName = newName;

  // console.log(' ---- BEGINNING TEST ---- ');
  // console.log('Always Add Suffix: ', settings?.alwaysAddSuffix);
  // console.log('.....');
  // console.log('Testing for name: ', uniqueName);
  // console.log('---- TRIALS ----');
  while (true) {
    // console.log('Trial ', trials);
    const exist = [
      ...prev.filter((metronome) => metronome.name != name),
      {
        ...prev.filter((metronome) => metronome.name == name)[0],
        name: uniqueName,
      },
    ].filter((metronome) => metronome.name == uniqueName).length;
    // console.log(exist, ' ', uniqueName, ' exist already.');
    if (exist <= 1) {
      uniqueName = trials == 0 ? newName : `${newName} (#${trials})`;
      // console.log(uniqueName, ' is available.');
      break;
    }
    trials++;
    uniqueName = `${newName} (#${trials})`;
  }

  return uniqueName;
}
