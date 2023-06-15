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
            className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-700 bg-clip-text text-center text-6xl font-black text-transparent sm:text-7xl"
          >
            The only metronome you'll ever need.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
            className="lora mx-2 mt-10 text-center text-base text-purple-200 sm:text-lg"
          >
            Seriously. <i className="inter not-italic">clicktrack</i> is a{' '}
            beautifully modern{' '}
            <i className="font-bold not-italic">dynamic metronome</i> which
            follows whatever musical arrangement you throw at it. Our user
            friendly interface allows you to build your own clicktrack and
            optimize your practice session.
          </motion.p>
          <div className="mx-2 mt-10 flex flex-wrap justify-center gap-2">
            <Link to="/register">
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
                  className="text-purple-950 rounded-md bg-purple-200 px-12 py-3 text-xl"
                >
                  Learn More
                </motion.button>
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
      <section className="my-10 flex flex-col px-2 sm:my-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          <div className="aspect-video w-full overflow-hidden rounded-lg rounded-b-none bg-black"></div>
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          <p className="w-full rounded-lg rounded-t-none bg-purple-300 p-5 text-xl">
            This is an awesome placeholder image. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Cupiditate itaque officiis
            dignissimos nam nemo perferendis voluptatibus libero omnis vitae.
            Quo quas recusandae tenetur fuga harum, aut nobis quod temporibus
            debitis.
          </p>
        </div>
      </section>
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
