export const SET_USER = "SET_USER";
export const SET_ERROR = "SET_ERROR";
export const DISABLE_SNACKBAR = "DISABLE_SNACKBAR";
export const LOADING = "LOADING";
export const USER_LOGOUT = "USER_LOGOUT";
export const UPDATE_DISTANCE = "UPDATE_DISTANCE";

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

export const disableSnackBar = () => ({
  type: DISABLE_SNACKBAR,
  payload: null,
});

export const setError = (errorData) => ({
  type: SET_ERROR,
  payload: errorData,
});

export const updateDistance = (fecNac) => ({
  type: UPDATE_DISTANCE,
  payload: fecNac,
});

export const setLoading = (loading) => ({
  type: LOADING,
  payload: loading,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: null,
});
