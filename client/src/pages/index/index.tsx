import { motion } from 'framer-motion';
import './index.css';

const Index = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center px-2">
        <div className="mx-auto flex max-w-5xl flex-col justify-center py-20">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            id="title"
            className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-700 bg-clip-text text-center text-5xl font-black text-transparent sm:text-7xl"
          >
            The only metronome you'll ever need.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lora mx-2 mt-10 text-center text-base text-purple-200 sm:text-lg"
          >
            Seriously. <i className="inter not-italic">clicktrack</i> is a{' '}
            beautifully modern{' '}
            <i className="font-bold not-italic">dynamic metronome</i> which
            follows whatever musical arrangement you throw at it. Our user
            friendly interface allows you to build your own clicktrack and
            optimize your practice session.
          </motion.p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              href="/app"
              target="_blank"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="rounded-md bg-purple-700 px-12 py-3 text-xl text-white shadow-2xl shadow-purple-500"
              >
                Get started
              </motion.button>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="text-purple-950 rounded-md bg-purple-200 px-12 py-3 text-xl"
              >
                Learn More
              </motion.button>
            </motion.a>
          </div>
        </div>
      </section>
      <section className="h-screen"></section>
      <section className="flex flex-col items-center p-10 text-purple-200">
        <p className="text-center">
          Thank you for choosing clicktrack. This project was made by Matthew
          Arthur under the GPL-3.0 license.
        </p>
        <i className="bi-heart-fill text-red-400"></i>
      </section>
    </>
  );
};

export default Index;
