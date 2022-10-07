import { FETCH_API } from '../actions';

const INITIAL_STATE = {
  api: {},
};

function stateGlobal(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      api: action.payload,
    };
  default:
    return state;
  }
}
export default stateGlobal;
