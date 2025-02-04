import { Navigate } from 'react-router-dom';

const AppIndex = () => {
  // usePageTitle('Metronome');

  // return (
  //   <ClicktrackApp
  //     loadedClicktrack={new Clicktrack({ name: 'Demo Clicktrack', id: 'demo' })}
  //   />
  // );

  return <Navigate to="/app/clicktracks" />;
};

export default AppIndex;
