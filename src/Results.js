import React from 'react';
import PropTypes from 'prop-types';

class Results extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };
  getResults() {
    return this.props.data.reduce((acc, cur) => {
      if (cur.type === 'answer') {
        let s = `word [${cur.text}] `;
        if (!cur.placed) {
          s += 'has not been placed';
        } else {
          s.concat(cur.text === cur.displayed
            ? 'correct!'
            : 'has not been place correctly'
          );
        }
        return acc.concat(s);
      }
      return acc;
    }, []);
  }
  renderResult(result) {
    return result.map((s, i) => (<p key={i}>{s}</p>));
  }
  render() {
    const results = this.getResults();
    return (
      <div>
        {this.renderResult(results)}
      </div>
    );
  }
}

export default Results;
