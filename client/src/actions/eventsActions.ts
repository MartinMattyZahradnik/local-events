export const actionTypes = {
  FETCH_EVENTS: "users/FETCH_USER",
  FETCH_EVENTS_SUCCESS: "users/FETCH_USER_SUCCESS",
  FETCH_EVENTS_ERROR: "users/FETCH_USER_SUCCESS"
};

export interface IEvents {
  id: string;
  name: string;
  description: string;
  location: string;
  date: number;
  imageUrl: string;
  images: string[];
  category: string;
  attendants: string[];
  similiarEvents?: string[];
  city: string;
  tags: string[];
  map: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
  };
}

export const fetchEvents = () => ({
  type: actionTypes.FETCH_EVENTS
});

export const fetchEventsSuccess = (payload: IEvents[]) => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload
});

export const fetchEventsError = (payload: any) => ({
  type: actionTypes.FETCH_EVENTS_ERROR,
  payload
});
