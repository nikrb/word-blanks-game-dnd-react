import React from 'react';
import PropTypes from 'prop-types';

import { Block, FormInput, FormRow, PrimaryButton } from './styled';

export default class QuestionBox extends React.Component {
  static propTypes = {
    onStart: PropTypes.func.isRequired,
    questionChange: PropTypes.func.isRequired,
  };
  render() {
    const { questionChange, onStart } = this.props;
    return (
      <Block>
        <FormRow>
          <FormInput data-testid='question-input' onChange={questionChange} />
          <PrimaryButton onClick={onStart}>Start</PrimaryButton>
        </FormRow>
      </Block>
    );
  }
}

