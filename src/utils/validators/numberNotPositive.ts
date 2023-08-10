export const numberNotPositive = (number: number) => {
  if (number > 0) return false;

  console.error('This value must be positive.');
  return true;
};
