export const formatAddress = ({
  street,
  postalCode,
  city,
  countryCode,
  country
}: any) => {
  return `${street} ${postalCode} ${city}`;
};
