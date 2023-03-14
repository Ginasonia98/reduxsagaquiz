const apiUrl = 'https://opentdb.com/api.php?amount=50&category=27&difficulty=medium&type=boolean';

export const fetchQuiz = () => {
  return fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => loadedQuestions.results)
    .catch((error) => Promise.reject(error));
};