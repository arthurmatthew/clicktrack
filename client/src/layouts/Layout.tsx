import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="bg-slate-950 flex min-h-screen flex-col" id="background">
      <Header />
      <main className="relative flex-1">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default Layout;
