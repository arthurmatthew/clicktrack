import { ClicktrackApp } from '../../components/clicktrack/ClicktrackApp';
import { usePageTitle } from '../../hooks/usePageTitle';
import { Clicktrack } from '../../models/Clicktrack';

const AppIndex = () => {
  usePageTitle('Metronome');

  return (
    <ClicktrackApp
      loadedClicktrack={new Clicktrack({ name: 'Demo Clicktrack', id: 'demo' })}
    />
  );
};

export default AppIndex;
