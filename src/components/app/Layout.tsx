import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppHeader } from './Header';
import { AppFooter } from './Footer';
import { ScrollToTop } from '../core/ScrollToTop';
import { useTheme } from '../../hooks/useTheme';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const { dark, toggleDark } = useTheme();

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] dark:bg-black">
        <AppHeader dark={dark} toggleDark={toggleDark} />
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
    </>
  );
};

export default AppLayout;
