import { Footer } from '../../components/index/Footer';
import { Header } from '../../components/index/Header';
import './Layout.css';
import { Suspense } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { LoadingScreen } from '../../components/core/LoadingScreen';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { dark, toggleDark } = useTheme();

  return (
    <>
      <div
        className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] dark:bg-zinc-900"
        id={dark ? 'background' : 'background-light'}
      >
        <Header dark={dark} toggleDark={toggleDark} />
        <main className="relative flex flex-auto flex-col">
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};
