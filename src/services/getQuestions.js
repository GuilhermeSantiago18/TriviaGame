const getToken = async () => {
  const TOKEN_BASE_API = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(TOKEN_BASE_API);
  const responseJson = await response.json();
  return responseJson;
};

const getQuestions = async () => {
  const token = await getToken();
  const numberOfQuestions = 5;
  const QUESTIONS_BASE_API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token.token}`;
  const response = await fetch(QUESTIONS_BASE_API);
  const responseJson = await response.json();
  return response.ok ? (
    Promise.resolve(responseJson)) : (Promise.resolve(responseJson));
};

export default getQuestions;
