export const actionTypes = {
  FETCH_USER: "users/FETCH_USER",
  FETCH_USER_SUCCESS: "users/FETCH_USER_SUCCESS",
  FETCH_USER_ERROR: "users/FETCH_USER_SUCCESS"
};

export interface IUser {
  id: string;
  name: string;
  firstName: string;
  userName: string;
  email: string;
  phone?: string;
  age?: number;
  gender: "male" | "female";
}

export const fetchUser = () => ({
  type: actionTypes.FETCH_USER
});

export const fetchUserSucces = (payload: IUser[]) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload
});

export const fetchUserError = (payload: any) => ({
  type: actionTypes.FETCH_USER_ERROR,
  payload
});
