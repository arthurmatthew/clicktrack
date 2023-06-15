import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Layout.css';
import { useState } from 'react';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [dark, setDark] = useState<boolean>(true);

  return (
    <div className={dark ? 'dark' : ''}>
      <div
        className="dark:bg-slate-950 flex min-h-screen flex-col bg-slate-100 bg-[length:40px_40px]"
        id={dark ? 'background' : 'background-light'}
      >
        <Header dark={dark} darkToggle={setDark} />
        <main className="relative flex flex-auto flex-col">
          {children ?? <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
