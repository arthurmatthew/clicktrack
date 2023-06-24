import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({
  darkToggle,
  dark,
}: {
  darkToggle: React.Dispatch<React.SetStateAction<boolean>>;
  dark: boolean;
}) => {
  const [hovering, setHovering] = useState(false);

  const toggleHovering = () => {
    setHovering((hovering) => !hovering);
  };

  return (
    <header className="bg-gradient-radial sticky top-0 z-10 shrink grow-0 basis-auto from-slate-100 to-slate-300 bg-[length:100%_200%] bg-[100%_0] p-5 backdrop-blur-sm backdrop-saturate-50 dark:from-slate-800/90 dark:to-slate-950">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link to="/" className="text-4xl text-slate-800 dark:text-slate-200">
          clicktrack
        </Link>
        <div className="flex gap-4">
          <i
            className={`${
              dark ? 'bi-moon' : 'bi-sun'
            } text-3xl text-slate-800  hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400`}
            onClick={() => darkToggle((prev) => !prev)}
          />
          <i
            onClick={toggleHovering}
            className="bi-person-circle relative text-3xl text-slate-800 hover:text-purple-600  dark:text-slate-200 dark:hover:text-purple-400"
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
      </div>
    </header>
  );
};

export default Header;
