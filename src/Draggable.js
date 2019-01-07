import React from 'react';
import { WordBox } from './styled';

class Draggable extends React.Component {
  onDragStart(e) {
    const { onDragStart, name } = this.props;
    onDragStart(e, name)
  }
  render() {
    const { name, bgcolor } = this.props;
    return (
      <WordBox
        data-testid="answer"
        onDragStart={this.onDragStart.bind(this)}
        draggable="true"
        bgcolor={bgcolor}
      >
        {name}
      </WordBox>
    );
  }
}

export default Draggable;
