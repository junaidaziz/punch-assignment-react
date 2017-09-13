import {
  LOAD_JS_QUESTIONS_SUCCESS,
  LOAD_ERROR,
  LOAD_JS_QUESTIONS,
  LOAD_C_QUESTIONS,
  LOAD_RUBY_QUESTIONS,
  LOAD_RUBY_QUESTIONS_SUCCESS,
  LOAD_C_QUESTIONS_SUCCESS,
} from './constants';

export function loadJsQuestions() {
  return {
    type: LOAD_JS_QUESTIONS,
  };
}

export function jsQuestionsLoaded(questions) {
  return {
    type: LOAD_JS_QUESTIONS_SUCCESS,
    questions,
  };
}

export function loadCQuestions() {
  return {
    type: LOAD_C_QUESTIONS,
  };
}

export function CQuestionsLoaded(questions) {
  return {
    type: LOAD_C_QUESTIONS_SUCCESS,
    questions,
  };
}

export function loadRubyQuestions() {
  return {
    type: LOAD_RUBY_QUESTIONS,
  };
}

export function rubyQuestionsLoaded(questions) {
  return {
    type: LOAD_RUBY_QUESTIONS_SUCCESS,
    questions,
  };
}

export function QuestionsLoadingError(error) {
  return {
    type: LOAD_ERROR,
    error,
  };
}
