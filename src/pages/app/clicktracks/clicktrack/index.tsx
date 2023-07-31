import { useParams } from 'react-router-dom';
import { MetronomeApp } from '../../../../metronome/MetronomeApp';
import { Clicktrack } from '../../../../metronome/classes/clicktrack';
import { storage } from '../../../../configs/storage.config';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams();

  const getClicktrack = (id: string) => {
    const clicktracks = JSON.parse(
      localStorage.getItem(storage.keys.clicktracks) as string
    ) as Clicktrack[];
    return clicktracks.find((clicktrack) => clicktrack.id === id);
  };

  const clicktrack = getClicktrack(decodeURIComponent(params.id as string));

  if (clicktrack != undefined) {
    return <MetronomeApp loadedClicktrack={clicktrack} />;
  }

  return <NotFound />;
};

const NotFound = () => {
  return (
    <div className="min-w-full flex-grow">
      <div className="mx-auto my-20 flex max-w-5xl flex-col items-center gap-4  ">
        <h1 className="text-3xl">We couldn't load your metronome</h1>
        <p className="text-xl opacity-80">
          It might not exist in your storage. Try again
        </p>
      </div>
    </div>
  );
};

export default ClicktrackPage;
