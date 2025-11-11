import { ReactNode, Suspense } from "react";
import { AppFooter } from "../../components/app/Footer";
import { AppHeader } from "../../components/app/Header";
import { LoadingScreen } from "../../components/core/LoadingScreen";
import { useTheme } from "../../hooks/useTheme";

export const Layout = ({ children }: {children: ReactNode}) => {
  const { dark, toggleDark } = useTheme();
  
    return (
      <>
        <div className="flex min-h-screen flex-col bg-white bg-[length:40px_40px] dark:bg-black">
          <AppHeader dark={dark} toggleDark={toggleDark} />
          <main className="relative flex min-h-0 flex-auto flex-col">
            <Suspense fallback={<LoadingScreen />}>
              {children}
            </Suspense>
          </main>
          <AppFooter />
        </div>
      </>
    );
}