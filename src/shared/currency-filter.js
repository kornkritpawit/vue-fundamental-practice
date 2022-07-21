export default function (amount, symbol) {
  // return `$${amount.toFixed(2)}`
  return `${symbol}${amount.toFixed(2)}`;
}
