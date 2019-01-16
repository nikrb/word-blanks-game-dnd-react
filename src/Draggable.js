import React from 'react';
import PropTypes from 'prop-types';

import { WordBox } from './styled';

class Draggable extends React.Component {
  static propTypes = {
    bgcolor: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onDragStart: PropTypes.func.isRequired,
  };
  onDragStart(e) {
    const { onDragStart, name } = this.props;
    onDragStart(e, name);
  }
  render() {
    const { name, bgcolor } = this.props;
    return (
      <WordBox
        bgcolor={bgcolor}
        data-testid='answer'
        draggable='true'
        onDragStart={this.onDragStart.bind(this)}
      >
        {name}
      </WordBox>
    );
  }
}

export default Draggable;
