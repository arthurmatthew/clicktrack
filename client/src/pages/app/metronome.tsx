import { useParams } from 'react-router-dom';
import { Section } from './metronomes';

const Metronome = () => {
  const params = useParams();

  const getMetronome = (id: string) => {
    const metronomes = JSON.parse(
      localStorage.getItem('metronomes') as string
    ) as Section[];
    return metronomes.find((metronome) => metronome.id == id);
  };

  const metronome = getMetronome(decodeURIComponent(params.id as string));

  if (metronome != undefined) {
    return JSON.stringify(metronome);
  }

  return <NotFound />;
};

const NotFound = () => {
  return (
    <div className="mx-auto my-20 flex max-w-5xl flex-col justify-center">
      <h1 className="text-3xl text-slate-900 dark:text-slate-200">
        We couldn't find this metronome.
      </h1>
    </div>
  );
};

export default Metronome;
