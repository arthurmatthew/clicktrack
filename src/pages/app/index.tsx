import { Navigate } from 'react-router';

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
