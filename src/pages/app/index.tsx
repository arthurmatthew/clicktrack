import Redirect from '../../components/routing/Redirect';

/**
 * Webpage which simply redirects you to the metronome list
 */
const AppIndex = () => {
  return <Redirect to="/app/metronomes" />;
};

export default AppIndex;
