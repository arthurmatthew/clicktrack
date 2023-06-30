import { useParams } from 'react-router-dom';
import MetronomeApp from '../../../metronome/components/MetronomeApp';
import Section from '../../../types/app/metronomes/Section';

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
    return <MetronomeApp data={metronome} />;
  }

  return <NotFound />;
};

const NotFound = () => {
  return (
    <div className="min-w-full flex-grow">
      <div className="mx-auto my-20 flex max-w-5xl flex-col items-center gap-4 text-slate-900 dark:text-slate-200">
        <h1 className="text-3xl">We couldn't load your metronome</h1>
        <p className="text-xl opacity-80">
          It might not exist in your storage. Try again
        </p>
      </div>
    </div>
  );
};

export default Metronome;
