import { FETCH_API, GET_USER } from '../actions';

const INITIAL_STATE = {
  api: {},
  user: '',
  counter: 30,
  countCorrect: 0,
};

function stateGlobal(state = INITIAL_STATE, action) {
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
      countCorrect: action.payload,

    };

  default:
    return state;
  }
}
export default stateGlobal;
