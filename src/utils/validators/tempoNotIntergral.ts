export const tempoNotIntegral = (amount: number) => {
  if (Number.isSafeInteger(amount)) return false;

  console.warn(
    "Your tempo must be a whole number. We've gone ahead and updated it for you."
  );
  return true;
};
