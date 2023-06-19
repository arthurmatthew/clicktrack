import { Outlet } from 'react-router-dom';
import './Layout.css';
import { Suspense } from 'react';
import useStickyState from '../hooks/useStickyState';
import { ScrollToTop } from '../helpers/scrollToTop';
import AppHeader from './AppLayout.Header';
import AppFooter from './AppLayout.Footer';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const [dark, setDark] = useStickyState<boolean>(true, 'dark-mode');

  return (
    <div className={dark ? 'dark' : ''}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-slate-100 bg-[length:40px_40px] dark:bg-slate-950">
        <AppHeader dark={dark} darkToggle={setDark} />
        <main className="relative flex flex-auto flex-col">
          <Suspense
            fallback={
              <div className="flex flex-grow items-center justify-center">
                <i className="bi-arrow-clockwise animate-spin text-5xl text-black dark:text-white" />
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
