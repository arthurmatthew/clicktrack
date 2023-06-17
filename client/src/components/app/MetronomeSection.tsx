import { useState } from 'react';

export interface IMetronomeSection {
  children?: React.ReactNode;
  name?: string;
  opened?: boolean;
}
export const MetronomeSection = ({
  children,
  name,
  opened,
}: IMetronomeSection) => {
  const [shown, setShown] = useState<boolean>(opened || false);

  return (
    <li className="w-full rounded-md border-2 border-slate-300 bg-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
      <div
        className="flex items-center justify-between text-slate-900 dark:text-slate-100"
        onClick={() => setShown((prev) => !prev)}
      >
        <h1 className="text-3xl font-semibold">
          <i className="bi-list mr-3 text-slate-600 dark:text-slate-400"></i>
          {name || 'Unnamed Section'}
        </h1>
        <i
          className={`${
            shown ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
          } text-2xl text-slate-600 dark:text-slate-400`}
        ></i>
      </div>

      {shown && children}
    </li>
  );
};
