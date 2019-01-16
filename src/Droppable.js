import React from 'react';
import PropTypes from 'prop-types';

import { WordBox } from './styled';

export default class Droppable extends React.Component {
  static propTypes = {
    bgcolor: PropTypes.string,
    children: PropTypes.string.isRequired,
    groupName: PropTypes.number.isRequired,
    ndx: PropTypes.number.isRequired,
    onDrop: PropTypes.func.isRequired,
  };
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
    const { bgcolor, ndx } = this.props;
    return (
      <WordBox
        bgcolor={bgcolor ? bgcolor : this.state.bgcolor}
        data-testid={`droppable${ndx}`}
        onDragLeave={this.onDragLeave.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        onDrop={this.onDrop.bind(this)}>
        {this.props.children}
      </WordBox>
    );
  }
}
