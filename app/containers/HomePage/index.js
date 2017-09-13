import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Table } from 'react-bootstrap';

import { loadJsQuestions, loadCQuestions, loadRubyQuestions } from './actions';
import { makeSelectError, makeSelectJsQuestions, makeSelectCQuestions, makeSelectRubyQuestions } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentWillMount() {
    this.props.loadJsQuestions();
    this.props.loadRubyQuestions();
    this.props.loadCQuestions();
  }

  render() {
    const { cQuestions, jsQuestions, rubyQuestions } = this.props;
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Language</th>
            <th>Questions Posted</th>
            <th>Questions Answered</th>
            <th>Answers Accepted</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>javascript</td>
            <td>{jsQuestions.count}</td>
            <td>{jsQuestions.answeredQuestions}</td>
            <td>{jsQuestions.acceptedAnswers}</td>
          </tr>
          <tr>
            <td>C++</td>
            <td>{cQuestions.count}</td>
            <td>{cQuestions.answeredQuestions}</td>
            <td>{cQuestions.acceptedAnswers}</td>
          </tr>
          <tr>
            <td>Ruby</td>
            <td>{rubyQuestions.count}</td>
            <td>{rubyQuestions.answeredQuestions}</td>
            <td>{rubyQuestions.acceptedAnswers}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loadJsQuestions: () => dispatch(loadJsQuestions()),
    loadRubyQuestions: () => dispatch(loadRubyQuestions()),
    loadCQuestions: () => dispatch(loadCQuestions()),
  };
}

const mapStateToProps = createStructuredSelector({
  jsQuestions: makeSelectJsQuestions(),
  rubyQuestions: makeSelectRubyQuestions(),
  cQuestions: makeSelectCQuestions(),
  error: makeSelectError(),
});

HomePage.propTypes = {
  loadJsQuestions: PropTypes.func.isRequired,
  loadRubyQuestions: PropTypes.func.isRequired,
  loadCQuestions: PropTypes.func.isRequired,
  cQuestions: PropTypes.object,
  jsQuestions: PropTypes.object,
  rubyQuestions: PropTypes.object,
};

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
