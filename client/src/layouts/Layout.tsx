import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Layout.css';
import { Suspense, useEffect, useState } from 'react';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [dark, setDark] = useState<boolean>(() => {
    const localDark = localStorage.getItem('dark-mode');
    if (localDark === null) {
      return true;
    }
    try {
      return JSON.parse(localDark);
    } catch (e) {
      console.log('Could not find dark mode preference');
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(dark));
  }, [dark]);

  return (
    <div className={dark ? 'dark' : ''}>
      <div
        className="flex min-h-screen flex-col bg-slate-100 bg-[length:40px_40px] dark:bg-slate-950"
        id={dark ? 'background' : 'background-light'}
      >
        <Header dark={dark} darkToggle={setDark} />
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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
