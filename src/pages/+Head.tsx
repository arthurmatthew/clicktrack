import { themeScript } from '../components/core/ThemeContext';

export default function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </>
  );
}
