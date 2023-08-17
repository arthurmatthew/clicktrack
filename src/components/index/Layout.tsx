import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import './Layout.css';
import { Suspense } from 'react';
import { ScrollToTop } from '../core/ScrollToTop';
import { useTheme } from '../../hooks/useTheme';
import { LoadingScreen } from '../core/LoadingScreen';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { dark, toggleDark } = useTheme();

  return (
    <>
      <ScrollToTop />
      <div
        className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] dark:bg-black"
        id={dark ? 'background' : 'background-light'}
      >
        <Header dark={dark} toggleDark={toggleDark} />
        <main className="relative flex flex-auto flex-col">
          <Suspense fallback={<LoadingScreen />}>
            {children ?? <Outlet />}
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
