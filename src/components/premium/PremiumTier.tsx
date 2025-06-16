import { useState } from 'react';
import { Feature } from './Feature';
import { SubscribeButton } from './SubscribeButton';
import { getSubscriptionCheckout } from '../../lib/stripe/getSubscriptionCheckout';
import { ITier } from './FreeTier';
import { motion } from 'framer-motion';

export const PremiumTier = ({ premium, user }: ITier) => {
  const [upgradeLoading, setUpgradeLoading] = useState(false);

  const handleSubscribe = async () => {
    setUpgradeLoading(true);
    await getSubscriptionCheckout(() => {
      setUpgradeLoading(false);
    }).catch((error) => {
      console.error(error);
      setUpgradeLoading(false);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative flex h-full flex-col items-center rounded-lg border-2 border-purple-500 bg-zinc-200 shadow-2xl shadow-purple-500/25 dark:bg-zinc-900 xl:col-span-2"
    >
      <h1 className="absolute -mt-5 rounded-full bg-purple-500 px-6 py-2 text-center text-white">
        Most Popular
      </h1>
      <div className="flex h-full flex-col justify-between p-16">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Premium</h1>
            <h2 className="text-5xl font-semibold">
              $4.99{' '}
              <span className="text-3xl font-normal opacity-50">/ month</span>
            </h2>
          </div>
          <p className="text-xl opacity-70">
            Premium includes everything in the free tier with no limits. You can
            use your premium account across all devices that support Clicktrack.
          </p>
          <ul className="flex flex-col gap-px bg-zinc-300 text-xl dark:bg-zinc-800">
            <Feature>Unlimited saved metronomes</Feature>
            <Feature>Help our service run</Feature>
          </ul>
          <SubscribeButton
            user={user}
            loading={upgradeLoading}
            onClick={handleSubscribe}
            subscribed={premium}
          />
        </div>
      </div>
    </motion.div>
  );
};
