import en from "localization/en/index";
import de from "localization/de/index";

export const localizePrice = (
  price: number = 0,
  locale: string = "en-US",
  currency: string = "USD"
): string => {
  if (price === 0) {
    return "FREE";
  }

  return price.toLocaleString(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  });
};

export default {
  en,
  de
};
