import React from 'react';

import Draggable from './Draggable';
import Droppable from './Droppable';
import { getSentence, getAnswers } from './TextConverter';

import {
  AppContainer,
  Block,
  PrimaryButton,
  WordBox,
  WordWrapper,
} from './styled';

/*
sentence:[
  { id: 1, text: 'The', type: 'word'},
  { id: 2, text: 'brown', type: 'answer', placed: false, display: '' },
]
 */

const text = 'The <brown> fox <jumped> over the <dog>';

class App extends React.Component {
  state = {
    result: [],
    answers: getAnswers(text),
    sentence: getSentence(text),
  };

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("text/plain", id);
  }

  onDrop = (ev, drop_id) => {
    const text = ev.dataTransfer.getData("text/plain");
    // ev.target.textContent = id;

    const sentence = this.state.sentence.map(w => {
      if (w.id === drop_id && !w.placed) {
        return { ...w, placed: true, displayed: text};
      }
      return w;
    });
    this.setState({ sentence });
  }

  test = () => {
    const result = this.state.sentence.reduce((acc, cur) => {
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
    console.log('result:', result);
    this.setState({ result });
  };
  renderResult(result) {
    return result.map((s,i) => (<p key={i}>{s}</p>));
  }

  render() {
    const { result } = this.state;
    const sentence = this.state.sentence.map((w, i) => {
      if (w.type === 'word') {
        return (<WordBox key={i}>{w.text}</WordBox>);
      }
      const show_results = result.length > 0;
      let bgcolor;
      if (show_results) {
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
    const answers = this.state.answers.map(a => (
      <Draggable key={a} onDragStart={this.onDragStart}
        name={a} bgcolor="lightgreen" />
    ));
    return (
      <AppContainer>
        <h2 className="header">Word Game</h2>
        <div>
          <PrimaryButton onClick={this.test}>Test</PrimaryButton>
        </div>
        <div>
          {this.renderResult(this.state.result)}
        </div>
        <Block>
          Fill in the blanks with the words below
          <WordWrapper>
            {sentence}
          </WordWrapper>
        </Block>
        <Block>
          Answers
          <WordWrapper>
            {answers}
          </WordWrapper>
        </Block>
      </AppContainer>
    );
  }
}

export default App;
