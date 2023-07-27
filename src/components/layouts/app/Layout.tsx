import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import AppHeader from './Header';
import AppFooter from './Footer';
import useStickyState from '../../../hooks/useStickyState';
import { ScrollToTop } from '../../../helpers/scrollToTop';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const [dark, setDark] = useStickyState<boolean>(true, 'dark-mode');

  return (
    <div className={dark ? 'dark' : ''}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] text-black dark:bg-black dark:text-white">
        <AppHeader dark={dark} darkToggle={setDark} />
        <main className="relative flex flex-auto flex-col">
          <Suspense
            fallback={
              <div className="flex flex-grow items-center justify-center">
                <i className="bi-arrow-clockwise animate-spin text-5xl" />
              </div>
            }
          >
            {children ?? <Outlet />}
          </Suspense>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default AppLayout;
