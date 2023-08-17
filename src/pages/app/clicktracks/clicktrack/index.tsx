import { useParams } from 'react-router-dom';
import { ClicktrackApp } from '../../../../components/clicktrack/ClicktrackApp';
import { ClicktrackNotFound } from '../../../../components/clicktrack/ClicktrackNotFound';
import { ClicktrackRouteParams } from '../../../../types';
import { Clicktrack } from '../../../../models/Clicktrack';

/**
 * Webpage which loads the metronome from storage and passes it off to the actual application.
 */
const ClicktrackPage = () => {
  const params = useParams<ClicktrackRouteParams>();
  const clicktrack = Clicktrack.localFromID(params.id);

  if (clicktrack !== undefined) {
    return <ClicktrackApp loadedClicktrack={clicktrack} />;
  }

  return <ClicktrackNotFound />;
};

export default ClicktrackPage;
