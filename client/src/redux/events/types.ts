export interface IEvent {
  _id: string;
  name: string;
  description: string;
  date: number;
  imageUrl: string;
  images?: string[];
  category: [string];
  attendants?: string[];
  similarEvents?: IEvent[];
  address: {
    street: string;
    postalCode: string;
    city: string;
    countryCode: string;
    country: string;
  };
  price: {
    price: number;
    currency: string;
    locale: string;
  };
  tags: string[];
  coordinates?: [number, number];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
  };
}

export type FetchEventsPayload = { pageNumber: number; perPage: number };

export interface ICreateEventActionPayload {
  name: string;
  description: string;
  date: number;
  imageUrl: string;
  images?: string[];
  category: string[];
  address: {
    street: string;
    postalCode: string;
    city: string;
    countryCode: string;
    country: string;
  };
  price: {
    price: number;
    currency: string;
    locale: string;
  };
  tags: string[];
  coordinates?: [number, number];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
  };
}
