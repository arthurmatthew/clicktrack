import { motion } from 'framer-motion';

export const SubscribeIndex = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="my-20 flex max-w-5xl flex-col justify-center">
        <h1 className="text-center text-6xl font-black sm:text-7xl">
          Upgrade to{' '}
          <span className="text-purple-700 dark:text-purple-600">Premium</span>
        </h1>
        <p className="mx-2 mt-10 text-center text-xl sm:text-2xl">
          Unlock Clicktrack's full potential with Clicktrack Premium.
        </p>
        <p className="text-center opacity-50">
          Unsubscribe at any time. Payments securely handled through Stripe.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Product
          index={1}
          label="Clicktrack Monthly"
          price="$4.99 USD / month"
        />
        <Product
          index={2}
          label="Clicktrack Quarterly"
          price="$12.99 USD / 3 months"
        />
        <Product
          index={3}
          label="Clicktrack Yearly"
          price="$49.99 USD / year"
        />
      </div>
    </div>
  );
};

interface IProduct {
  label: string;
  price: string;
  index: number;
}

const Product = ({ label, price, index }: IProduct) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ delay: 0.1 * index }}
      className="flex h-full w-full flex-col items-center gap-4 rounded-md bg-neutral-900 p-6"
    >
      <h1 className="text-center text-4xl font-semibold">{label}</h1>
      <h2 className="text-2xl">{price}</h2>
      <button className="w-full rounded-lg bg-purple-600 py-2 text-2xl">
        Subscribe
      </button>
    </motion.div>
  );
};
