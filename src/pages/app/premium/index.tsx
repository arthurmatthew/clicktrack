import { FreeTier } from '../../../components/premium/FreeTier';
import { PremiumTier } from '../../../components/premium/PremiumTier';
import { PremiumTitle } from '../../../components/premium/PremiumTitle';
import { useUser } from '../../../hooks/useUser';

export const PremiumIndex = () => {
  const { user, premium } = useUser();

  return (
    <div className="flex flex-col items-center px-4 pb-4">
      <PremiumTitle />
      <section className="flex w-full max-w-7xl flex-col-reverse gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        <FreeTier {...{ user, premium }} />
        <PremiumTier {...{ user, premium }} />
      </section>
    </div>
  );
};
