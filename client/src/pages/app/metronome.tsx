import { useParams } from 'react-router-dom';
import { Section } from './metronomes';

const Project = () => {
  const { id } = useParams();
  const decoded = decodeURIComponent(id as string);

  const getMetronome = (name: string) => {
    const metronomes = JSON.parse(
      localStorage.getItem('metronomes') as string
    ) as Section[];
    return metronomes.filter((x) => x.name == name)[0];
  };

  return JSON.stringify(getMetronome(decoded));
};

export default Project;
