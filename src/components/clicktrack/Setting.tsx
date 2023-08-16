import { IComponent } from '../IComponent';

interface ISetting extends IComponent {
  label: string;
  description: string;
}

export const Setting = ({ label, description, children }: ISetting) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 text-xl">
        <div>{children}</div>
        <h2>{label}</h2>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};
