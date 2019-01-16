import React from 'react';
import PropTypes from 'prop-types';

import Droppable from './Droppable';

import { Block, WordBox, WordWrapper } from './styled';

class SentenceBox extends React.Component {
  static propTypes = {
    marked: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    sentence: PropTypes.array.isRequired,
  };
  onDrop = (e, id) => {
    this.props.onDrop(e, id);
  };
  render() {
    const { marked } = this.props;
    const sentence = this.props.sentence.map((w, i) => {
      if (w.type === 'word') {
        return (<WordBox data-testid={'word'} key={i}>{w.text}</WordBox>);
      }
      let bgcolor;
      if (marked) {
        bgcolor = w.text === w.displayed ? 'lightgreen' : '#F77';
      }
      return (
        <Droppable
          bgcolor={bgcolor}
          groupName={w.id}
          key={i}
          ndx={i}
          onDrop={this.onDrop}
        >
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
