import React from 'react';

import { WordBox } from './styled';

export default class Droppable extends React.Component {
  onDrop(e) {
    const { groupName, onDrop } = this.props;
    onDrop(e, groupName);
  }
  render() {
    const { onDragOver } = this.props;
    return (
      <WordBox
        onDragOver={onDragOver}
        onDrop={this.onDrop.bind(this)}>
        {this.props.children}
      </WordBox>
    );
  };
};
