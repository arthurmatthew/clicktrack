import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppHeader } from './Header';
import { AppFooter } from './Footer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ScrollToTop } from '../core/ScrollToTop';
import { STORAGE_KEYS_DARKMODE } from '../../config';
import { AppNotification } from '../core/AppNotification';
import { NotificationProvider } from '../core/NotificationProvider';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const [dark, setDark] = useLocalStorage<boolean>(true, STORAGE_KEYS_DARKMODE);

  return (
    <NotificationProvider>
      <div className={dark ? 'dark' : ''}>
        <div className="text-black dark:text-white">
          <AppNotification />
          <ScrollToTop />
          <div className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] dark:bg-black">
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
      </div>
    </NotificationProvider>
  );
};

export default AppLayout;
