import React from 'react';
import PropTypes from 'prop-types';

import Draggable from './Draggable';

import { Block, WordWrapper } from './styled';

class AnswerBox extends React.Component {
  static propTypes = {
    answers: PropTypes.array.isRequired,
  };
  onDragStart(e, id) {
    // prevent stack trace on test
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', id);
    }
  }

  render() {
    const answers = this.props.answers.map(a => (
      <Draggable
        bgcolor='rgba(255,255,255,0)'
        key={a}
        name={a}
        onDragStart={this.onDragStart.bind(this)}
      />
    ));
    return (
      <Block>
        Answers
        <WordWrapper>
          {answers}
        </WordWrapper>
      </Block>
    );
  }
}

export default AnswerBox;
