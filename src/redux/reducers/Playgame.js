import { FETCH_API, GET_USER } from '../actions';

const INITIAL_STATE = {
  api: {},
  user: '',
  counter: 30,
};

function stateGlobal(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return {
      user: action.payload,
    };
  case FETCH_API:
    return {
      ...state,
      api: action.payload,
    };
  case 'TIMER':
    return {
      ...state,
      counter: action.payload,
    };
  default:
    return state;
  }
}
export default stateGlobal;
