import { STORAGE_KEYS_DARKMODE } from '../config';

export default function Head() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const stored = localStorage.getItem('${STORAGE_KEYS_DARKMODE}');
                const isDark = stored ? JSON.parse(stored) : true;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `,
        }}
      />
    </>
  );
}
