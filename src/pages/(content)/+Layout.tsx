import { Footer } from '../../components/index/Footer';
import { Header } from '../../components/index/Header';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white bg-size-[40px_40px] dark:bg-zinc-900">
        <Header />
        <main className="relative flex flex-auto flex-col">{children}</main>
        <Footer />
      </div>
    </>
  );
};
