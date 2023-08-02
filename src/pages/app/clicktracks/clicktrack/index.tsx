import { useParams } from 'react-router-dom';
import { ClicktrackApp } from './ClicktrackApp';
import { Clicktrack } from '../../../../clicktrack';
import { STORAGE_KEYS_CLICKTRACK } from '../../../../config';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams();

  const getClicktrack = (id: string) => {
    const clicktracks = JSON.parse(
      localStorage.getItem(STORAGE_KEYS_CLICKTRACK) as string
    ) as Clicktrack[];
    return clicktracks.find((clicktrack) => clicktrack.id === id);
  };

  const clicktrack = getClicktrack(decodeURIComponent(params.id as string));

  if (clicktrack !== undefined) {
    return <ClicktrackApp loadedClicktrack={clicktrack} />;
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
