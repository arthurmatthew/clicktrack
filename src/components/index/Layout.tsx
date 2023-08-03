import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import './Layout.css';
import { Suspense } from 'react';
import { ScrollToTop } from '../core/ScrollToTop';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS_DARKMODE } from '../../config';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [dark, setDark] = useLocalStorage<boolean>(true, STORAGE_KEYS_DARKMODE);

  return (
    <div className={dark ? 'dark' : ''}>
      <ScrollToTop />
      <div
        className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] text-black dark:bg-black dark:text-white"
        id={dark ? 'background' : 'background-light'}
      >
        <Header dark={dark} darkToggle={setDark} />
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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;