/**
 * Gets the repositories of the user from Github
 */
import _ from 'lodash';
import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_JS_QUESTIONS, LOAD_C_QUESTIONS, LOAD_RUBY_QUESTIONS } from './constants';
import { jsQuestionsLoaded, QuestionsLoadingError, CQuestionsLoaded, rubyQuestionsLoaded } from './actions';

/**
 * Github repos request/response handler
 */

function getAnswersCount(quesArr, responseObject) {
  const answeredQuestions = _.filter(quesArr, 'is_answered');
  const acceptedAnswers = [];
  _.map(quesArr, (question) => {
    if (question.hasOwnProperty('accepted_answer_id')) {
      acceptedAnswers.push(question);
    }
  });
  responseObject.acceptedAnswers = acceptedAnswers.length;
  responseObject.answeredQuestions = answeredQuestions.length;
  return responseObject;
}


export function* getJSQuestions() {
  // Select username from store
  const requestURL = 'https://api.stackexchange.com/2.2/search/advanced?fromdate=1505260800&order=desc&sort=activity&tagged=javascript&site=stackoverflow';
  try {
    // Call our request helper (see 'utils/request')
    const jsQuestions = yield call(request, requestURL);
    const responseObject = { count: jsQuestions.items.length };
    getAnswersCount(jsQuestions.items, responseObject);
    yield put(jsQuestionsLoaded(responseObject));
  } catch (err) {
    yield put(QuestionsLoadingError(err));
  }
}

export function* getRubyQuestions() {
  // Select username from store
  const requestURL = 'https://api.stackexchange.com/2.2/search/advanced?fromdate=1505260800&order=desc&sort=activity&tagged=ruby&site=stackoverflow';

  try {
    // Call our request helper (see 'utils/request')
    const rubyQuestions = yield call(request, requestURL);
    const responseObject = { count: rubyQuestions.items.length };
    getAnswersCount(rubyQuestions.items, responseObject);
    yield put(rubyQuestionsLoaded(responseObject));
  } catch (err) {
    yield put(QuestionsLoadingError(err));
  }
}

export function* getCQuestions() {
  // Select username from store
  const requestURL = 'https://api.stackexchange.com/2.2/search/advanced?fromdate=1505260800&order=desc&sort=activity&tagged=c%2B%2B&site=stackoverflow';

  try {
    // Call our request helper (see 'utils/request')
    const cQuestions = yield call(request, requestURL);
    const responseObject = { count: cQuestions.items.length };
    getAnswersCount(cQuestions.items, responseObject);
    yield put(CQuestionsLoaded(responseObject));
  } catch (err) {
    yield put(QuestionsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  const watcher = yield takeLatest(LOAD_JS_QUESTIONS, getJSQuestions);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* cData() {
  const cWatcher = yield takeLatest(LOAD_C_QUESTIONS, getCQuestions);

  yield take(LOCATION_CHANGE);
  yield cancel(cWatcher);
}

export function* rubyData() {
  const watcher = yield takeLatest(LOAD_RUBY_QUESTIONS, getRubyQuestions);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// Bootstrap sagas
export default [
  githubData,
  cData,
  rubyData,
];
