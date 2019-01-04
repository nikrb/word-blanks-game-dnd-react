import React from 'react';

import { WordBox } from './styled';

export default class Droppable extends React.Component {
  state = {
    bgcolor: 'white'
  };
  onDrop(e) {
    const { groupName, onDrop } = this.props;
    onDrop(e, groupName);
    this.setState({ bgcolor: 'white' });
  }
  onDragOver(e) {
    e.preventDefault();
    this.setState({ bgcolor: 'yellow' });
  }
  onDragLeave(e) {
    e.preventDefault();
    this.setState({ bgcolor: 'white' });
  }
  render() {
    const { bgcolor } = this.props;
    return (
      <WordBox bgcolor={bgcolor ? bgcolor : this.state.bgcolor}
        onDragOver={this.onDragOver.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDrop={this.onDrop.bind(this)}>
        {this.props.children}
      </WordBox>
    );
  };
};
