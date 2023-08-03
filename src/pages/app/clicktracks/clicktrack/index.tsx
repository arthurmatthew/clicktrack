import { useParams } from 'react-router-dom';
import { ClicktrackApp } from './ClicktrackApp';
import { Clicktrack } from '../../../../models/clicktrack/Clicktrack';
import { STORAGE_KEYS_CLICKTRACK } from '../../../../config';
import { ClicktrackNotFound } from './not-found';

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

  return <ClicktrackNotFound />;
};

export default ClicktrackPage;
