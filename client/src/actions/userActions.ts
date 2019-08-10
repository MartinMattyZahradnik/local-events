export const actionTypes = {
  FETCH_USER: "users/FETCH_USER",
  FETCH_USER_SUCCESS: "users/FETCH_USER_SUCCESS",
  FETCH_USER_ERROR: "users/FETCH_USER_SUCCESS"
};

export const fetchUsers = () => ({
  type: actionTypes.FETCH_USER
});

export const fetchUsersSucces = (payload: any) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload
});

export const fetchUsersError = (payload: any) => ({
  type: actionTypes.FETCH_USER_ERROR,
  payload
});
