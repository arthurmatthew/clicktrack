import { ReactNode, Suspense } from 'react';
import { AppFooter } from '../../components/app/Footer';
import { AppHeader } from '../../components/app/Header';
import { LoadingScreen } from '../../components/core/LoadingScreen';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex h-screen flex-col bg-white bg-size-[40px_40px] dark:bg-black">
        <AppHeader />
        <main className="relative flex min-h-0 flex-auto flex-col">
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </main>
        <AppFooter />
      </div>
    </>
  );
};
