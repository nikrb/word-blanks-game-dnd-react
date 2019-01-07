import React from 'react'

import Draggable from './Draggable';

import { Block, WordWrapper } from './styled';

class AnswerBox extends React.Component {

  onDragStart(e, id) {
    // prevent stack trace on test
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", id);
    }
  };

  render () {
    const answers = this.props.answers.map(a => (
      <Draggable key={a} onDragStart={this.onDragStart.bind(this)}
        name={a} bgcolor="rgba(255,255,255,0)"/>
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
