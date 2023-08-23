import { ClicktrackApp } from '../../components/clicktrack/ClicktrackApp';
import { Clicktrack } from '../../models/Clicktrack';

const AppIndex = () => {
  return (
    <ClicktrackApp
      loadedClicktrack={new Clicktrack({ name: 'Demo Clicktrack', id: 'demo' })}
    />
  );
};

export default AppIndex;
