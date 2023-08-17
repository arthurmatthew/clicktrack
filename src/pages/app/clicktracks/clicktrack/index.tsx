import { useLoaderData } from 'react-router-dom';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { Clicktrack } from '../../../../models/Clicktrack';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const clicktrack = useLoaderData() as Clicktrack | undefined;

  if (clicktrack !== undefined) {
    return <ClicktrackApp loadedClicktrack={clicktrack} />;
  }

  return <ClicktrackNotFound />;
};

export default ClicktrackPage;
