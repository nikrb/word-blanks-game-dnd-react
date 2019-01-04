import React from 'react';

import Draggable from './Draggable';
import Droppable from './Droppable';
import { getSentence, getAnswers } from './TextConverter';

import { AppContainer, WordWrapper, WordBox } from './styled';

/*
sentence:[
  { text: 'The', type: 'word'},
  { text: 'brown', type: 'answer', placed: false },
]
 */

const text = 'The <brown> fox <jumped> over the <dog>';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: getAnswers(text),
      sentence: getSentence(text),
    };
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("text/plain", id);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, cat) => {
    const text = ev.dataTransfer.getData("text/plain");

    // ev.target.textContent = id;

    const sentence = this.state.sentence.map(w => {
      if (w.text === text && !w.placed) {
        w.placed = true;
      }
      return w;
    });
    this.setState({ sentence });
  }

  render() {
    const sentence = this.state.sentence.map((w, i) => {
      if (w.type === 'word') {
        return (<WordBox key={i}>{w.text}</WordBox>);
      }
      return (
        <Droppable key={i}
          groupName="wip"
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}>
          {w.placed ? w.text : ' '}
        </Droppable>
      );
    });
    const answers = this.state.answers.map(a => (
      <Draggable key={a} onDragStart={this.onDragStart}
        name={a} bgcolor="lightgreen" />
    ));
    return (
      <AppContainer className="container-drag">
        <h2 className="header">Word Game</h2>
        <div>
          <span>Fill in the blanks with the words below</span>
          <WordWrapper>
            {sentence}
          </WordWrapper>
        </div>
        <div>
          <span>Answers</span>
          <WordWrapper>
            {answers}
          </WordWrapper>
        </div>
      </AppContainer>
    );
  }
}

export default App;
