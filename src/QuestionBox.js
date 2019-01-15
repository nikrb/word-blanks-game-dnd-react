import React from 'react';

import { Block, FormInput, FormRow, PrimaryButton } from './styled';

export default class QuestionBox extends React.Component {
  render() {
    const { questionChange, onStart } = this.props;
    return (
      <Block>
        <FormRow>
          <FormInput onChange={questionChange} />
          <PrimaryButton onClick={onStart}>Start</PrimaryButton>
        </FormRow>
      </Block>
    );
  }
}

