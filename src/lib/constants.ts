export const BROKER_PHONE = process.env.NEXT_PUBLIC_BROKER_PHONE || '+917971442220';
export const PHONE_HREF = BROKER_PHONE ? `tel:${BROKER_PHONE}` : '#';
export const WHATSAPP_NUMBER = BROKER_PHONE ? BROKER_PHONE.replace(/[^0-9]/g, '') : '';
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in rental properties in Kondapur. Please share available options."
);
export const WHATSAPP_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
  : '#';

export const SITE_NAME = 'RENTALS KONDAPUR';
export const SITE_TAGLINE = 'Premium Rental Properties in Kondapur, Hyderabad';
export const SITE_DESCRIPTION =
  'Find the best rental properties in Kondapur. No visiting fee, only brokerage. 1 BHK, 2 BHK, 3 BHK available.';

export const MARQUEE_TEXTS = [
  'Premium Living in Kondapur',
  'No Hidden Charges',
  'Verified Properties',
  'Instant Move-in',
  'Prime Locations',
  'Hassle-free Rental',
];

export const BROKER_EMAIL = process.env.NEXT_PUBLIC_BROKER_EMAIL || 'rentalskondapur@email.com';