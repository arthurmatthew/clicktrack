import { FooterContribute } from './FooterContribute';
import { FooterFootnote } from './FooterFootnote';
import { FooterSocial } from './FooterSocial';

export const Footer = () => {
  return (
    <footer className="flex flex-shrink basis-44 flex-col justify-center bg-gradient-radial from-white to-neutral-300 bg-[length:100%_200%] bg-[100%_100%] px-4 py-10 dark:from-neutral-950 dark:to-black">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        <FooterContribute />
        <FooterSocial />
      </div>
      <FooterFootnote />
    </footer>
  );
};
