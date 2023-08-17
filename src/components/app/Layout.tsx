import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppHeader } from './Header';
import { AppFooter } from './Footer';
import { ScrollToTop } from '../core/ScrollToTop';
import { useTheme } from '../../hooks/useTheme';
import { LoadingScreen } from '../core/LoadingScreen';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const { dark, toggleDark } = useTheme();

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] dark:bg-black">
        <AppHeader dark={dark} toggleDark={toggleDark} />
        <main className="relative flex flex-auto flex-col">
          <Suspense fallback={<LoadingScreen />}>
            {children ?? <Outlet />}
          </Suspense>
        </main>
        <AppFooter />
      </div>
    </>
  );
};

export default AppLayout;
