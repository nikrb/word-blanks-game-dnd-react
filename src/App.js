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
    showResults: false,
    question: '',
    answers: getAnswers(text),
    sentence: getSentence(text),
  };

  onDrop(ev, dropId) {
    const text = ev.dataTransfer.getData('text/plain');
    // ev.target.textContent = id;

    const sentence = this.state.sentence.map(w => {
      if (w.id === dropId) {
        return { ...w, placed: true, displayed: text};
      }
      return w;
    });
    this.setState({ sentence });
  }
  onStart() {
    this.setState({
      question: '',
      answers: getAnswers(this.state.question),
      sentence: getSentence(this.state.question),
    });
  }
  questionChange(e) {
    this.setState({question: e.target.value});
  }

  test = () => {
    this.setState({ showResults: !this.state.showResults });
  };

  render() {
    const { showResults } = this.state;
    return (
      <AppContainer>
        <h2 className='header'>Word Game</h2>
        <QuestionBox
          onStart={this.onStart.bind(this)}
          questionChange={this.questionChange.bind(this)}
        />
        <div>
          <PrimaryButton onClick={this.test}>Test</PrimaryButton>
        </div>
        <SentenceBox
          marked={showResults}
          onDrop={this.onDrop.bind(this)}
          sentence={this.state.sentence}
        />
        <AnswerBox answers={this.state.answers} />
        {showResults && <Results data={this.state.sentence} /> }
      </AppContainer>
    );
  }
}

export default App;
