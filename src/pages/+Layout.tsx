import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { AppNotification } from "../components/core/AppNotification";
import { NotificationProvider } from "../components/core/NotificationProvider";
import { ThemeProvider } from "../components/core/ThemeProvider";

export const Layout = ({ children }: {children: ReactNode}) => {
  return (<ThemeProvider>
        <NotificationProvider>
          <Analytics />
          <AppNotification />
          {children}
        </NotificationProvider>
      </ThemeProvider>)
}