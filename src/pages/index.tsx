import { Hero } from '../components/index/Hero';
import { Features } from '../components/index/Features';
import { NonHeroContent } from '../components/index/NonHeroContent';
import { WhyUs } from '../components/index/WhyUs';

export const Index = () => {
  return (
    <>
      <Hero />
      <Features />
      <NonHeroContent>
        <WhyUs />
      </NonHeroContent>
    </>
  );
};
