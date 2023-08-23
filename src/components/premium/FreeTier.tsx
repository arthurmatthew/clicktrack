import { User } from 'firebase/auth';
import { Downside } from './Downside';
import { SubscribeButton } from './SubscribeButton';
import { motion } from 'framer-motion';

export interface ITier {
  user: User | null;
  premium: boolean;
}

export const FreeTier = ({ premium, user }: ITier) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.8 }}
      className="flex h-full flex-col items-center overflow-hidden rounded-lg bg-neutral-900"
    >
      <div className="flex h-full w-full flex-col justify-between p-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Free</h1>
            <h2 className="text-5xl font-semibold">
              $0{' '}
              <span className="text-3xl font-normal opacity-50">/ sign up</span>
            </h2>
          </div>
          <p className="text-xl opacity-70">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <ul className="flex flex-col gap-px bg-neutral-800 text-xl">
            <Downside>Up to 3 saved metronomes</Downside>
            <Downside>Up to 3 saved metronomes</Downside>
            <Downside>Up to 3 saved metronomes</Downside>
            <Downside>Up to 3 saved metronomes</Downside>
            <Downside>Up to 3 saved metronomes</Downside>
            <Downside>Up to 3 saved metronomes</Downside>
          </ul>
        </div>
        <SubscribeButton user={user} subscribed={!premium} />
      </div>
    </motion.div>
  );
};