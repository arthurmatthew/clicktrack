import { IComponent } from '../IComponent';

export const NonHeroContent = ({ children }: IComponent) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900" id="about">
      <div className="mx-auto my-20 max-w-7xl px-10">{children}</div>
    </div>
  );
};
