import { IComponent } from '../IComponent';

interface IInfoCard extends IComponent {
  title: string;
  icon: string;
  emoji?: string;
}

export const InfoCard = ({ children, title, icon, emoji }: IInfoCard) => {
  return (
    <div className="flex w-full cursor-pointer flex-col gap-2 rounded-sm bg-neutral-100 p-4 dark:bg-neutral-900 ">
      <div className="flex items-center gap-3">
        <h1 className="rounded-full bg-neutral-200 p-2 text-2xl leading-none text-purple-600 dark:bg-neutral-700 dark:text-purple-400">
          {emoji ? emoji : <i className={`bi-${icon}`} />}
        </h1>
        <h1 className="text-2xl font-black">{title}</h1>
      </div>
      <p>{children}</p>
    </div>
  );
};
