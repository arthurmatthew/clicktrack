import { Navigate } from 'react-router-dom';

/**
 * Webpage which simply redirects you to the metronome list
 */
const AppIndex = () => {
  return <Navigate to="/app/clicktracks" />;
};

export default AppIndex;
