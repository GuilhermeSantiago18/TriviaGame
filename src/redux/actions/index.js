const FETCH_API = 'FETCH_API';
const GET_USER = 'GET_USER';

const fetchAPI = (payload) => ({
  type: FETCH_API,
  payload,
});
const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

const fetchCurrency = () => async (dispatch) => {
  try {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const result = await response.json();
    dispatch(fetchAPI(result));
  } catch (e) {
    localStorage.clear();
    const { history } = this.props;
    history.push('/');
    throw new Error(e);
  }
};

const getQuestions = async () => {
  try {
    const token = localStorage.getItem('token');
    const numberOfQuestions = 5;
    const QUESTIONS_BASE_API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
    const response = await fetch(QUESTIONS_BASE_API);
    const responseJson = await response.json();
    return response.ok ? (
      Promise.resolve(responseJson)) : (Promise.resolve(responseJson));
  } catch (e) { throw new Error(e); }
};

export {
  FETCH_API,
  fetchAPI,
  fetchCurrency,
  getUser,
  GET_USER,
  getQuestions,
};
