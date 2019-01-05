import React from 'react'

import Droppable from './Droppable';

import { Block, WordBox, WordWrapper } from './styled';

class SentenceBox extends React.Component {
  onDrop = (e, id) => {
    this.props.onDrop(e, id);
  };
  render () {
    const { marked } = this.props;
    const sentence = this.props.sentence.map((w, i) => {
      if (w.type === 'word') {
        return (<WordBox key={i}>{w.text}</WordBox>);
      }
      let bgcolor;
      if (marked) {
        bgcolor = w.text === w.displayed ? 'lightgreen' : '#F77';
      }
      return (
        <Droppable key={i}
          bgcolor={bgcolor}
          groupName={w.id}
          onDrop={this.onDrop}>
          {w.placed ? w.displayed : ' '}
        </Droppable>
      );
    });
    return (
      <Block>
        Fill in the blanks with the words below
        <WordWrapper>
          {sentence}
        </WordWrapper>
      </Block>
    );
  }
}

export default SentenceBox;
