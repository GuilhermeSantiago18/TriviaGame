import { FETCH_API, GET_USER, GET_POINTS } from '../actions';

const INITIAL_STATE = {
  api: {},
  user: '',
  counter: 30,
  assertions: 0,
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      user: action.payload,
    };
  case FETCH_API:
    return {
      ...state,
      api: action.payload,
    };
  case 'CORRECT_ANSWER':
    return {
      ...state,
      assertions: action.payload,

    };
  case GET_POINTS:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}
export default player;
