import { Hero } from '../components/index/Hero';
import { Features } from '../components/index/Features';
import { NonHeroContent } from '../components/index/NonHeroContent';
import { WhyUs } from '../components/index/WhyUs';
import { BeforeFooter } from '../components/index/BeforeFooter';
import { useNotify } from '../hooks/useNotify';
import { useEffect } from 'react';

export const Index = () => {
  const { notify } = useNotify();
  useEffect(() => {
    notify('Hello', 'info');
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <NonHeroContent>
        <WhyUs />
      </NonHeroContent>
      <BeforeFooter />
    </>
  );
};
