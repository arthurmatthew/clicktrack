import { motion } from 'framer-motion';
import './index.css';

import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center px-2">
        <div className="mx-auto my-20 flex max-w-5xl flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            id="title"
            className="bg-gradient-to-r from-purple-700 via-violet-700 to-purple-900 bg-clip-text text-center text-6xl font-black text-transparent dark:from-purple-400 dark:via-violet-400 dark:to-purple-700 sm:text-7xl"
          >
            The only metronome you'll ever need.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
            className="mx-2 mt-10 text-center text-lg text-slate-900 dark:text-slate-200 sm:text-xl"
          >
            Seriously. <i className="inter not-italic">clicktrack</i> is a{' '}
            beautifully modern{' '}
            <i className="font-bold not-italic">dynamic metronome</i> which
            follows whatever musical arrangement you throw at it. Our user
            friendly interface allows you to build your own clicktrack and
            optimize your practice session.
          </motion.p>
          <div className="mx-2 mt-10 flex flex-wrap justify-center gap-2">
            <Link to="/app">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="rounded-md bg-purple-700 px-12 py-3 text-xl text-white shadow-2xl shadow-purple-500"
                >
                  Get started
                </motion.button>
              </motion.span>
            </Link>
            <Link to={'#'}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="rounded-md bg-slate-800 px-12 py-3 text-xl text-slate-100 dark:bg-slate-200 dark:text-slate-950"
                >
                  Learn More
                </motion.button>
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
      <section className="my-10 flex flex-col px-2 sm:my-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <InfoCard icon="stack" title="Portable">
            Clicktrack is designed to work on any modern device. It'll be
            amazing no matter what. Not on your device?{' '}
            <a
              href="https://github.com/arthurmatthew/clicktrack/issues/new"
              className="underline"
              target="_blank"
            >
              Request it
            </a>
          </InfoCard>
          <InfoCard icon="emoji-smile-fill" title="Easy">
            It's easy when you want it to be. We make it easy to ignore all the
            advanced features. You don't need to be a music nerd.
          </InfoCard>
          <InfoCard icon="cloud-download-fill" title="Saveable">
            You can save your metronomes to the cloud or your local storage.
          </InfoCard>
          <InfoCard icon="hammer" title="Designable">
            Quickly build a metronome around an entire piece of music.
          </InfoCard>
          <InfoCard icon="recycle" title="Dynamic">
            Our metronome will adapt to whatever tempo changes your music has.
          </InfoCard>
          <InfoCard icon="emoji-sunglasses-fill" title="Feature-packed">
            We have everything a metronome should have. And then some.{' '}
            <a className="underline">Learn more</a>
          </InfoCard>
        </div>
      </section>
      <section className="bg-gradient-blurry my-10 flex flex-col px-2 sm:my-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="m-4 rounded-md p-4 backdrop-blur-lg backdrop-brightness-90">
            <div className="flex flex-col gap-4 rounded-md bg-slate-200 p-4 text-slate-900 dark:bg-slate-800 dark:text-slate-200">
              <h1 className="text-6xl font-semibold">Check out our blog</h1>
              <p className="text-2xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
                perspiciatis sequi, labore nisi fugiat officia error modi
                accusamus rerum a, unde quas dolore eius et velit quae, mollitia
                culpa. Eveniet! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Nam sapiente ea quos. Nihil, perferendis
                tempora quidem itaque qui aspernatur, soluta, blanditiis placeat
                perspiciatis voluptate tenetur error autem iure illo earum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const InfoCard = ({
  children,
  title,
  icon,
  emoji,
}: {
  title: string;
  icon: string;
  children?: React.ReactNode;
  emoji?: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-slate-200 p-4 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <h1 className="rounded-full bg-slate-300 p-2 text-2xl leading-none text-purple-600 dark:bg-slate-700 dark:text-purple-400">
          {emoji ? emoji : <i className={`bi-${icon}`} />}
        </h1>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-200">
          {title}
        </h1>
      </div>
      <p className="text-slate-900 dark:text-slate-200">{children}</p>
    </div>
  );
};

export default Index;
