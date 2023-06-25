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
        <div className="hidden gap-4 sm:flex">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-xl text-slate-800  hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400`}
            onClick={() => darkToggle((prev) => !prev)}
          />
          <i
            onClick={toggleHovering}
            className="bi-person-circle relative select-none text-xl text-slate-800 hover:text-purple-600  dark:text-slate-200 dark:hover:text-purple-400"
          >
            <AnimatePresence>
              {hovering && (
                <motion.div
                  initial={{ opacity: 0, x: 10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 10, y: -10 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                  className="absolute right-0 min-w-max"
                >
                  <div className="my-2 flex flex-col gap-2 rounded-md border-2 border-slate-300 p-4 text-lg not-italic text-slate-800 backdrop-blur-sm dark:border-slate-700 dark:text-slate-200">
                    <Link
                      to="/register"
                      className="duration-75 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="duration-75 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Login
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </i>
        </div>
        <div className="relative flex items-center justify-center sm:hidden">
          <i
            className="bi-list cursor-pointer text-2xl"
            onClick={() => setMenuShowing((prev) => !prev)}
          />
          {menuShowing && (
            <AnimatePresence>
              <motion.ul
                initial={{ opacity: 0, x: 10, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 10, y: -10 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="absolute right-0 top-full flex select-none flex-col gap-2 rounded-lg border-2 border-slate-300 bg-slate-200 px-4 py-3 shadow-2xl shadow-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-600"
              >
                <li
                  className="flex w-max cursor-pointer items-center gap-2"
                  onClick={() => darkToggle((prev) => !prev)}
                >
                  <i
                    className={`${
                      dark ? 'bi-moon' : 'bi-sun'
                    } text-xl text-slate-800 dark:text-slate-200`}
                  />
                  <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    Change Theme
                  </h1>
                </li>
              </motion.ul>
            </AnimatePresence>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
