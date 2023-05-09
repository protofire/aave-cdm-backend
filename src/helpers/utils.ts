const toNormalNumber = (num: string, decimals: number) =>
  (parseFloat(num) / Math.pow(10, decimals)).toFixed(2).toString();

export { toNormalNumber };
