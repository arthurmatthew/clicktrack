import { useContext } from 'react';
import { NotificationContext } from '../components/core/NotificationProvider';

export const useNotify = () => {
  const { notif, notify, clearNotif } = useContext(NotificationContext);
  return { notif, notify, clearNotif };
};
