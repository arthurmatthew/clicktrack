import { createContext, useCallback, useState } from 'react';
import {
  TNotification,
  TNotificationContext,
  TNotificationTypes,
} from '../../types';
import { IComponent } from '../IComponent';

export const NotificationContext = createContext<TNotificationContext>({
  notif: undefined,
  notify: () => {},
  clearNotif: () => {},
});

export const NotificationProvider = ({ children }: IComponent) => {
  const [notif, setNotif] = useState<TNotification>(undefined);

  const clearNotif = () => setNotif(undefined);
  const notify = (content: string, type: TNotificationTypes) => {
    setNotif({ content, type });
    switch (type) {
      case 'error':
        console.error(
          `[clicktrack user error] Something went wrong. Make sure everything looks correct. Here's a message from our system to assist you:\n\n${content}`
        );
        return;
      case 'warning':
        console.warn(
          `[clicktrack user warning] Something doesn't look right. Clicktrack will still work properly, but you may want to fix your issues. Here's a message from our system to assist you:\n\n${content}`
        );
        return;
      case 'info':
        console.log(`[clicktrack]\n\n${content}`);
        return;
    }
  };

  const contextValue: TNotificationContext = {
    notif,
    notify: useCallback(
      (content: string, type: TNotificationTypes) => notify(content, type),
      []
    ),
    clearNotif: useCallback(clearNotif, []),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
