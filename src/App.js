import React from 'react';

import QuestionBox from './QuestionBox';
import SentenceBox from './SentenceBox';
import AnswerBox from './AnswerBox';
import Results from './Results';
import { getSentence, getAnswers } from './TextConverter';

import { AppContainer, PrimaryButton } from './styled';

/*
sentence:[
  { id: 1, text: 'The', type: 'word'},
  { id: 2, text: 'brown', type: 'answer', placed: false, display: '' },
]
 */

const text = 'The <brown> fox <jumped> over the <dog>';

class App extends React.Component {
  state = {
    show_results: false,
    question: "",
    answers: getAnswers(text),
    sentence: getSentence(text),
  };

  onDrop(ev, drop_id) {
    const text = ev.dataTransfer.getData("text/plain");
    // ev.target.textContent = id;

    const sentence = this.state.sentence.map(w => {
      if (w.id === drop_id) {
        return { ...w, placed: true, displayed: text};
      }
      return w;
    });
    this.setState({ sentence });
  };
  onStart() {
    this.setState({
      question: "",
      answers: getAnswers(this.state.question),
      sentence: getSentence(this.state.question),
    });
  }
  questionChange(e) {
    this.setState({question: e.target.value});
  }

  test = () => {
    this.setState({ show_results: !this.state.show_results });
  };

  render() {
    const { show_results } = this.state;
    return (
      <AppContainer>
        <h2 className="header">Word Game</h2>
        <QuestionBox
          questionChange={this.questionChange.bind(this)}
          onStart={this.onStart.bind(this)}
        />
        <div>
          <PrimaryButton onClick={this.test}>Test</PrimaryButton>
        </div>
        <SentenceBox
          sentence={this.state.sentence}
          onDrop={this.onDrop.bind(this)}
          marked={show_results}
        />
        <AnswerBox answers={this.state.answers} />
        {show_results && <Results data={this.state.sentence} /> }
      </AppContainer>
    );
  }
}

export default App;
