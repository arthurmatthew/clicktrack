import { Hero } from '../components/index/Hero';
import { usePageTitle } from '../hooks/usePageTitle';

export const Index = () => {
  usePageTitle('Home');

  return (
    <>
      <Hero />
    </>
  );
};
