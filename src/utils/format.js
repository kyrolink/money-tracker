import { CURRENCIES } from "../constants/currencies";

export function formatCurrency(
  amount,
  currency = "IDR"
) {
  const selected =
    CURRENCIES.find(
      (item) => item.code === currency
    ) || CURRENCIES[0];

  return new Intl.NumberFormat(
    selected.locale,
    {
      style: "currency",
      currency: selected.code,
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}