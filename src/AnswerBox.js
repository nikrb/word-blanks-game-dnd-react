import React from 'react'

import Draggable from './Draggable';

import { Block, WordWrapper } from './styled';

class AnswerBox extends React.Component {

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("text/plain", id);
  };

  render () {
    const answers = this.props.answers.map(a => (
      <Draggable key={a} onDragStart={this.onDragStart}
        name={a} bgcolor="lightgreen" />
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
