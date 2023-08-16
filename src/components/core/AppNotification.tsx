import { useEffect, useRef } from 'react';
import { useNotify } from '../../hooks/useNotify';
import { AnimatePresence, motion } from 'framer-motion';
import { NOTIFICATION_FADE_AFTER } from '../../config';

export const AppNotification = () => {
  const { notif, clearNotif } = useNotify();
  const notificationTimeout = useRef<number>();

  useEffect(() => {
    clearTimeout(notificationTimeout.current);
    notificationTimeout.current = setTimeout(() => {
      clearNotif();
    }, NOTIFICATION_FADE_AFTER);
  }, [notif]);

  return (
    <AnimatePresence>
      {notif && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ ease: 'easeOut' }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 z-[99999999999] m-1 max-w-xl rounded-sm border-[1px] border-neutral-800 bg-white p-3 text-lg shadow-2xl dark:bg-black sm:m-6 sm:p-6 sm:text-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {(() => {
                switch (notif.type) {
                  case 'warning':
                    return <Warning />;
                  case 'error':
                    return <Error />;
                  case 'info':
                    return <Info />;
                  default:
                    return <Warning />;
                }
              })()}
            </div>
            <button onClick={clearNotif}>
              <i className="bi-x-lg" />
            </button>
          </div>
          <div className="my-2 h-px w-36 bg-gradient-to-r from-neutral-800 to-transparent" />
          <p className="text-base">{notif.content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Warning = () => {
  return (
    <>
      <i className="bi-exclamation-diamond-fill text-yellow-500" />
      <h1 className="font-semibold">Warning</h1>
    </>
  );
};

const Error = () => {
  return (
    <>
      <i className="bi-dash-circle-fill text-red-500" />
      <h1 className="font-semibold">Error</h1>
    </>
  );
};

const Info = () => {
  return (
    <>
      <i className="bi-info-circle-fill" />
      <h1 className="font-semibold">Info</h1>
    </>
  );
};
