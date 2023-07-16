import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AppHeader = ({
  darkToggle,
  dark,
}: {
  darkToggle: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}) => {
  const [hovering, setHovering] = useState(false);
  const [menuShowing, setMenuShowing] = useState(false);

  const toggleHovering = () => {
    setHovering((hovering) => !hovering);
  };

  return (
    <header className="sticky top-0 z-10 shrink grow-0 basis-auto border-b-2 border-slate-300 bg-inherit px-3 py-2 dark:border-slate-700">
      <div className="mx-auto flex w-full items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-purple-700 dark:text-purple-400"
        >
          ct.
        </Link>
        <Link
          to="/app/metronomes"
          className="flex items-center gap-1 rounded-md border-2 border-slate-300 px-4 py-1 text-slate-900 dark:border-slate-700 dark:text-slate-200"
        >
          Metronomes
        </Link>
        <div className="flex gap-4">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-xl text-slate-800  hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400`}
            onClick={() => darkToggle((prev) => !prev)}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
