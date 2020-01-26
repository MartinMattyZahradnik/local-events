export const formatAddress = ({
  street,
  postalCode,
  city
}: {
  street: string;
  postalCode?: string;
  city: string;
}): string => {
  return `${street} ${postalCode} ${city}`;
};
