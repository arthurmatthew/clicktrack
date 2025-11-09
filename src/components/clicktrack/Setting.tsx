import { IComponent } from '../IComponent';

interface ISetting extends IComponent {
  label: string;
  description?: string;
  disabled?: boolean;
}

export const Setting = ({
  label,
  description,
  disabled,
  children,
}: ISetting) => {
  return (
    <div
      className={`flex flex-col gap-2 ${
        disabled ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-4 text-xl">
        <div>{children}</div>
        <h2>{label}</h2>
      </div>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};
