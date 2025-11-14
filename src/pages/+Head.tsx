import { themeScript } from '../components/core/ThemeContext';

export default function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Clicktrack</title>
      <meta
        name="description"
        content="A metronome that does everything a musician could want it to."
      />
      <meta property="og:title" content="Clicktrack" />
      <meta
        property="og:description"
        content="A modern, musician-centered metronome"
      />
      <meta property="og:type" content="website" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7e22ce" />
      <meta name="msapplication-TileColor" content="#7e22ce" />
      <meta name="theme-color" content="#e3c2ff" />
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </>
  );
}
