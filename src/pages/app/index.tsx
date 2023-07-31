import { Redirect } from '../../components/routing/Redirect';

/**
 * Webpage which simply redirects you to the metronome list
 */
const AppIndex = () => {
  return <Redirect to="/app/clicktracks" />;
};

export default AppIndex;
