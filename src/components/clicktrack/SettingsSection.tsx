import { IComponent } from '../IComponent';

interface ISettingsSection extends IComponent {
  name: string;
}

export const SettingsSection = ({ name, children }: ISettingsSection) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold uppercase text-black/50 dark:text-white/50">
        {name}
      </h1>
      {children}
    </div>
  );
};
