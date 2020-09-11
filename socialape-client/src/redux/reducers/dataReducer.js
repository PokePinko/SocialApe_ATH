import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
} from "../types";
const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCREAMS:
      return { ...state, screams: action.payload, loading: false };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let indexD = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      console.log("index a detuire : " + indexD + "depuis " + action.payload);
      state.screams.splice(indexD, 1);
      return { ...state };
    case POST_SCREAM:
      return { ...state, screams: [action.payload, ...state.screams] };
    case LOADING_DATA:
      return { ...state, loading: true };
    default:
      return state;
  }
}
