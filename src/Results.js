
import React from 'react';

class Results extends React.Component {
  getResults() {
    return this.props.data.reduce((acc, cur) => {
      if (cur.type === 'answer') {
        let s = `word [${cur.text}] `;
        if (!cur.placed) {
          s += 'has not been placed';
        } else {
          if (cur.text === cur.displayed) {
            s += 'correct!';
          } else {
            s += 'has not been placed correctly';
          }
        }
        return acc.concat(s);
      }
      return acc;
    }, []);
  };
  renderResult(result) {
    return result.map((s,i) => (<p key={i}>{s}</p>));
  }
  render () {
    const results = this.getResults();
    return (
      <div>
        {this.renderResult(results)}
      </div>
    );
  }
}

export default Results;
