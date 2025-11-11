import { Hero } from "../../../components/index/Hero";
import { usePageTitle } from "../../../hooks/usePageTitle";

export const Page = () => {
  usePageTitle('Home');

  return (
    <>
      <Hero />
    </>
  );
};