import {
  SET_USER,
  SET_ERROR,
  DISABLE_SNACKBAR,
  USER_LOGOUT,
  LOADING,
  UPDATE_DISTANCE,
} from "../actions/user.actions";
import { distance } from "./../utils/helperFunctions";

export const userInitialState = {
  loading: false,
  isLoggedIn: false,
  error: "",
  snackBar: false,
  user: {},
  distance: null,
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: action.payload,
        // distance: distance(action.payload.data.fec_nac),
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        loading: false,
        snackBar: true,
        error: action.payload,
      };
    }
    case DISABLE_SNACKBAR: {
      return {
        ...state,
        snackBar: false,
      };
    }
    case UPDATE_DISTANCE: {
      return {
        ...state,
        distance: distance(action.payload),
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default userReducer;
