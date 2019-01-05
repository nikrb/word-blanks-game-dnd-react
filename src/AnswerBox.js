import React from 'react'

import Draggable from './Draggable';

import { Block, WordWrapper } from './styled';

class AnswerBox extends React.Component {

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("text/plain", id);
  };

  render () {
    const answers = this.props.answers.map(a => (
      <Draggable key={a} onDragStart={this.onDragStart}
        name={a} />
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
